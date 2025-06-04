import React, { useState } from 'react';

export const PatientCard = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); // Lista pacjentów z backendu
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  // Parsuj imię i nazwisko z inputa (prosto, bez walidacji edge-case'ów)
  const parseName = (value) => {
    const parts = value.trim().split(' ');
    if (parts.length >= 2) {
      return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
    }
    return { firstName: value, lastName: '' };
  };

  // Autouzupełnianie po wpisaniu min. 3 znaków
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedPatient(null);
    setShowSuggestions(false);

    const { firstName, lastName } = parseName(value);

    if (firstName.length >= 2 && lastName.length >= 1) {
      setLoading(true);
      try {
        const url = `/api/postgres/patients?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`;
        const res = await fetch(url);
        const data = await res.json();
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Wybór pacjenta z rozwijanej listy
  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setShowSuggestions(false);
    setQuery(`${patient.firstName} ${patient.lastName}`);
  };

  return (
    <div>
      <h2>Karta Pacjenta</h2>
      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Wpisz imię i nazwisko (np. Jan Kowalski)"
          value={query}
          onChange={handleInputChange}
          style={{ width: 300 }}
        />
        {loading && <span style={{ marginLeft: 8 }}>⏳</span>}
        {/* Lista rozwijana z sugestiami */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              border: '1px solid #ccc',
              width: 300,
              position: 'absolute',
              background: 'white',
              zIndex: 10
            }}
          >
            {suggestions.map((patient, idx) => (
              <li
                key={patient.id}
                style={{
                  padding: 6,
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee'
                }}
                onClick={() => handleSelectPatient(patient)}
              >
                {patient.firstName} {patient.lastName} ({patient.age} lat, {patient.gender})
              </li>
            ))}
          </ul>
        )}
        {/* Gdy nie ma pasujących pacjentów */}
        {showSuggestions && !loading && suggestions.length === 0 && (
          <div style={{ color: 'gray' }}>Brak wyników</div>
        )}
      </div>

      {/* Szczegóły wybranego pacjenta */}
      {selectedPatient && (
        <div style={{ border: '1px solid #aaa', padding: 16, marginTop: 30, width: 350 }}>
          <h3>Dane osobowe</h3>
          <p>
            <b>Imię:</b> {selectedPatient.firstName}<br />
            <b>Nazwisko:</b> {selectedPatient.lastName}<br />
            <b>Wiek:</b> {selectedPatient.age} lat<br />
            <b>Płeć:</b> {selectedPatient.gender}
          </p>
          <h4>Karta wizyt</h4>
          {selectedPatient.visits && selectedPatient.visits.length > 0 ? (
            <table border="1" cellPadding={5}>
              <thead>
                <tr>
                  <th>Data wizyty</th>
                  <th>Objawy</th>
                  <th>Diagnoza</th>
                  <th>Leczenie</th>
                </tr>
              </thead>
              <tbody>
                {selectedPatient.visits.map(v => (
                  <tr key={v.id}>
                    <td>{v.visitDate}</td>
                    <td>{v.symptoms}</td>
                    <td>{v.diagnosis}</td>
                    <td>{v.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>Brak wizyt tego pacjenta.</div>
          )}
        </div>
      )}
    </div>
  );
};
