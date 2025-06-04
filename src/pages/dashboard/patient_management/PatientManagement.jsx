import React, { useEffect, useState } from 'react';

export const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editData, setEditData] = useState({});

  // Pobierz pacjentów na start
  useEffect(() => {
    fetch('/api/postgres/patients')
      .then(res => res.json())
      .then(data => setPatients(data));
  }, []);

  // Usuwanie pacjenta
  const handleDelete = async (id) => {
    if (!window.confirm('Na pewno usunąć pacjenta?')) return;
    const res = await fetch(`/api/postgres/patients/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPatients(patients.filter(p => p.id !== id));
      alert('Usunięto pacjenta.');
    } else {
      alert('Błąd podczas usuwania pacjenta!');
    }
  };

  // Rozpocznij edycję
  const handleEdit = (idx) => {
    setEditingIdx(idx);
    setEditData({
      firstName: patients[idx].firstName,
      lastName: patients[idx].lastName,
      age: patients[idx].age,
      gender: patients[idx].gender
    });
  };

  // Zmień dane w formularzu edycji
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // Zapisz edycję do bazy
  const handleSave = async (id) => {
    const res = await fetch(`/api/postgres/patients/${id}`, {
      method: 'PUT', // lub PATCH jeśli tylko częściowo aktualizujesz
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editData)
    });
    if (res.ok) {
      const updated = await res.json();
      setPatients(
        patients.map((p, idx) =>
          idx === editingIdx ? updated : p
        )
      );
      setEditingIdx(null);
      alert('Zmieniono dane pacjenta!');
    } else {
      alert('Nie udało się zapisać zmian.');
    }
  };

  // Anuluj edycję
  const handleCancel = () => {
    setEditingIdx(null);
    setEditData({});
  };

  return (
    <div>
      <h2>Zarządzanie Pacjentami</h2>
      <table border="1" cellPadding={8} style={{ minWidth: 500 }}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Wiek</th>
            <th>Płeć</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p, idx) => (
            editingIdx === idx ? (
              <tr key={p.id}>
                <td>
                  <input
                    name="firstName"
                    value={editData.firstName}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="lastName"
                    value={editData.lastName}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="age"
                    type="number"
                    min={0}
                    value={editData.age}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <select
                    name="gender"
                    value={editData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Wybierz</option>
                    <option value="male">Mężczyzna</option>
                    <option value="female">Kobieta</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleSave(p.id)}>Zapisz</button>
                  <button onClick={handleCancel} style={{ marginLeft: 6 }}>Anuluj</button>
                </td>
              </tr>
            ) : (
              <tr key={p.id}>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
                <td>{p.age}</td>
                <td>{p.gender === 'male' ? 'Mężczyzna' : p.gender === 'female' ? 'Kobieta' : '-'}</td>
                <td>
                  <button onClick={() => handleEdit(idx)}>Edytuj</button>
                  <button onClick={() => handleDelete(p.id)} style={{ marginLeft: 6 }}>Usuń</button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  );
};
