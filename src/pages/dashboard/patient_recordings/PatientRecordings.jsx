import React, { useEffect, useState } from 'react';

export const PatientRecordings = () => {
  const [patients, setPatients] = useState([]);

useEffect(() => {
  fetch('/api/health/recordings')
    .then(res => res.json())
    .then(data => {
      console.log("Odebrano:", data);
      setPatients(Array.isArray(data) ? data : []);
    })
    .catch(err => {
      console.error("Błąd przy pobieraniu:", err);
      setPatients([]);
    });
}, []);


  const handleAccept = async (idx) => {
    const p = patients[idx];

    // Przygotuj payload zgodnie z API /patients/add-visit
    const payload = {
      firstName: p.firstName,
      lastName: p.lastName,
      age: p.age,
      gender: p.gender,
      visit: {
        visitDate: new Date().toISOString().slice(0, 10),
        symptoms: (p.symptoms || []).join(', '),
        diagnosis: (p.diagnosis || []).join(', '),
        treatment: (p.treatment || []).join(', ')
      }
    };

    try {
      // Wysyłamy do backendu Postgresa przez proxy
      const response = await fetch('/api/postgres/patients/add-visit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Błąd podczas zapisu do bazy!');
      await response.json(); // można wyświetlić info, ale nie trzeba

      // Usuń rekord z listy oczekujących
      setPatients(patients.filter((_, i) => i !== idx));
      alert('Zapisano pacjenta w bazie!');
    } catch (err) {
      alert('Nie udało się zapisać pacjenta: ' + err.message);
    }
  };

  const handleReject = (idx) => {
    fetch(`/api/health/recordings/${idx}`, { method: 'DELETE' })
      .then(() => setPatients(patients.filter((_, i) => i !== idx)));
  };

  return (
    <div>
      <h2>Nowe nagrania pacjentów</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Wiek</th>
            <th>Płeć</th>
            <th>Objawy</th>
            <th>Diagnoza</th>
            <th>Leczenie</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, idx) => (
            <tr key={idx}>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.age}</td>
              <td>{p.gender}</td>
              <td>{(p.symptoms || []).join(', ')}</td>
              <td>{(p.diagnosis || []).join(', ')}</td>
              <td>{(p.treatment || []).join(', ')}</td>
              <td>
                <button onClick={() => handleAccept(idx)}>Akceptuj</button>
                <button onClick={() => handleReject(idx)} style={{ marginLeft: 8 }}>Odrzuć</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
