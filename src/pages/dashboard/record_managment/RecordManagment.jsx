import React, { useEffect, useState } from 'react';

export const RecordManagment = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Pobierz listę nagrań z backendu (springboot minio)
  const fetchRecords = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/minio/audio/list'); // <- poprawiony endpoint
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Błąd podczas ładowania nagrań z Minio!');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecords(); }, []);

  // Usuń nagranie po nazwie
  const handleDelete = async (filename) => {
    if (!window.confirm('Na pewno usunąć to nagranie?')) return;
    try {
      const response = await fetch(`/api/minio/audio/delete/${encodeURIComponent(filename)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error();
      await fetchRecords();
      alert('Usunięto nagranie!');
    } catch {
      alert('Błąd podczas usuwania nagrania');
    }
  };

  // Pobierz plik do odsłuchania
  const handleDownload = (filename) => {
    // Po stronie backendu najlepiej dodać endpoint GET /audio/download/{filename}
    // Ale możesz też użyć presigned url jeśli taki endpoint jest
    window.open(`/api/minio/audio/download-url/${encodeURIComponent(filename)}`, '_blank');
  };

  return (
    <div>
      <h2>Zarządzanie nagraniami</h2>
      {loading && <div>Ładowanie...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table border="1" cellPadding={6} style={{ width: '100%', maxWidth: 800 }}>
        <thead>
          <tr>
            <th>Nazwa pliku (timestamp)</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {records.map(filename => (
            <tr key={filename}>
              <td>{filename}</td>
              <td>
                {/* <button style={{color:'green'}} onClick={() => handleDownload(filename)}>⬇ Odsłuchaj/Pobierz</button> */}
                <button style={{color: 'red', marginLeft: 8}} onClick={() => handleDelete(filename)}>🗑 Usuń</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(records.length === 0 && !loading) && <p>Brak nagrań w bazie Minio.</p>}
    </div>
  );
};
