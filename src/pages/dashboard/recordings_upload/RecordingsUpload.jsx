import React, { useRef, useState, useEffect } from 'react';
import WavEncoder from 'wav-encoder';
import { PatientRecordings } from '../patient_recordings/PatientRecordings';

export const RecordingsUpload = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [wavBlob, setWavBlob] = useState(null);
  const [refreshList, setRefreshList] = useState(false); // do odświeżenia listy nagrań
  const [minioFiles, setMinioFiles] = useState([]);
  const [selectedMinioFile, setSelectedMinioFile] = useState('');
  const [selectedMinioBlob, setSelectedMinioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Pobierz listę plików z Minio (przy montażu)
  useEffect(() => {
    fetch('/api/minio/audio/list')
      .then(res => res.json())
      .then(setMinioFiles)
      .catch(() => setMinioFiles([]));
  }, [refreshList]);



const handleStartRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new window.MediaRecorder(stream, { mimeType: 'audio/webm' });

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setAudioBlob(audioBlob);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      // Konwersja webm → WAV
      const wavBlob = await convertWebMToWav(audioBlob);
      setWavBlob(wavBlob);

      // Wyczyszczenie wyboru nagrania z Minio
      setSelectedMinioFile('');
      setSelectedMinioBlob(null);

      // ✅ Automatyczny upload po konwersji (z opóźnieniem)
      setTimeout(async () => {
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
        const filename = `${timestamp}.wav`;
        const formData = new FormData();
        formData.append('file', wavBlob, filename);

        try {
          const response = await fetch('/api/minio/audio/upload', {
            method: 'POST',
            body: formData,
          });
          if (!response.ok) throw new Error('Błąd uploadu do Minio!');
          alert('Plik przesłany do Minio!');
          setRefreshList(r => !r);
        } catch (err) {
          alert('Nie udało się przesłać nagrania: ' + err.message);
        }
      }, 1000);
    };

    mediaRecorder.start();
    setIsRecording(true);
  } catch (error) {
    alert('Błąd podczas uruchamiania nagrywania audio: ' + error.message);
  }
};

  // Stop recording
const handleStopRecording = () => {
  if (mediaRecorderRef.current) {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  }
};


  // Konwersja WebM (Opus) → WAV
  const convertWebMToWav = async (webmBlob) => {
    const arrayBuffer = await webmBlob.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const channelData = [];
    for (let i = 0; i < audioBuffer.numberOfChannels; i++) {
      channelData.push(audioBuffer.getChannelData(i));
    }
    const wavData = {
      sampleRate: audioBuffer.sampleRate,
      channelData: channelData,
    };
    const wavArrayBuffer = await WavEncoder.encode(wavData);
    return new Blob([wavArrayBuffer], { type: 'audio/wav' });
  };

  // Przeanalizuj wybrane nagranie (czy to nowe, czy wybrane z listy)
  const handleSend = async () => {
    // Preferujemy: wybrane z listy → wysyłamy je, inaczej ostatnie nagrane
    let blobToSend = null;
    if (selectedMinioBlob) {
      blobToSend = selectedMinioBlob;
    } else if (wavBlob) {
      blobToSend = wavBlob;
    } else {
      alert('Najpierw nagraj lub wybierz głosówkę!');
      return;
    }
    const formData = new FormData();
    formData.append('file', blobToSend, 'recording.wav');
    try {
      const response = await fetch('http://localhost:8083/transcribe', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Błąd przesyłania nagrania');
      setRefreshList(r => !r);
      alert('Przesłano do analizy!');
    } catch (error) {
      alert('Błąd podczas przesyłania nagrania: ' + error.message);
    }
  };

  // Pobierz wybrane nagranie z Minio do odsłuchania i do analizy
  const handleChooseFromList = async (e) => {
    const filename = e.target.value;
    setSelectedMinioFile(filename);
    setAudioUrl(null); // reset playera na czas ładowania
    setSelectedMinioBlob(null);
    if (!filename) return;

    try {
      // Pobierz presigned URL do pliku (może być też raw endpoint download jeśli masz)
      const urlRes = await fetch(`/api/minio/audio/download-url/${encodeURIComponent(filename)}`);
      const { } = await urlRes.json
      let downloadUrl = '';
      if (urlRes.ok) {
        downloadUrl = await urlRes.text();
      } else {
        // fallback: direct endpoint jeśli nie masz presigned
        downloadUrl = `/api/minio/audio/download/${encodeURIComponent(filename)}`;
      }

      // Pobierz WAV jako blob
      const fileRes = await fetch(downloadUrl);
      const fileBlob = await fileRes.blob();
      setAudioUrl(URL.createObjectURL(fileBlob));
      setSelectedMinioBlob(fileBlob);
      // Usuwamy lokalne nagranie jeśli istnieje
      setWavBlob(null);
    } catch (err) {
      alert('Nie udało się pobrać nagrania z Minio: ' + err.message);
      setAudioUrl(null);
      setSelectedMinioBlob(null);
    }
  };

  return (
    <div>
      <h2>Dodaj głosówkę (WAV po konwersji)</h2>
      <div>
        {!isRecording && (
          <button onClick={handleStartRecording} style={{ marginRight: 10 }}>🎙️ Start nagrania</button>
        )}
        {isRecording && (
          <button onClick={handleStopRecording} style={{ marginRight: 10, background: 'red', color: 'white' }}>⏹ Stop nagrania</button>
        )}
        <button onClick={handleSend} disabled={!(wavBlob || selectedMinioBlob)}>📤 Analizuj</button>

        {/* Wybierz z listy Minio */}
        <select value={selectedMinioFile} onChange={handleChooseFromList} style={{ marginLeft: 16 }}>
          <option value="">Wybierz nagranie z Minio...</option>
          {minioFiles.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div style={{ marginTop: 16 }}>
        {audioUrl && (
          <audio controls src={audioUrl} />
        )}
      </div>

      {/* Wyświetlanie tabeli z PatientInfo */}
      <PatientRecordings key={refreshList} />
    </div>
  );
};
