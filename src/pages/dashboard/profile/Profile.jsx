import React, { useEffect, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { InteractionRequiredAuthError } from '@azure/msal-browser'

export const Profile = () => {
  const { instance, accounts } = useMsal()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const request = {
      scopes: ['User.Read'],
      account: accounts[0],
    }

    const fetchProfile = async () => {
      try {
        const response = await instance.acquireTokenSilent(request)
        const accessToken = response.accessToken

        const graphResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const data = await graphResponse.json()
        setProfile(data)
      } catch (error) {
        if (error instanceof InteractionRequiredAuthError) {
          instance.acquireTokenRedirect(request)
        } else {
          console.error('Błąd pobierania profilu:', error)
        }
      }
    }

    if (accounts.length > 0) {
      fetchProfile()
    }
  }, [accounts, instance])

  return (
    <div>
      <h2>Profil użytkownika</h2>
      {profile ? (
        <div>
          <p><strong>Imię:</strong> {profile.givenName}</p>
          <p><strong>Nazwisko:</strong> {profile.surname}</p>
          <p><strong>Email:</strong> {profile.userPrincipalName}</p>
          <p><strong>ID:</strong> {profile.id}</p>
        </div>
      ) : (
        <p>Ładowanie danych użytkownika...</p>
      )}
    </div>
  )
}
