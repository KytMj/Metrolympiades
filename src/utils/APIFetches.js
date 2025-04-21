

export async function fetchMatches(token) {
  const response = await fetch('http://localhost:3000/matches/me', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}


export async function fetchAllTeams() {
  const response = await fetch('http://localhost:3000/teams', {
    method: 'GET',
  })
  return await response.json()
}

export async function fetchMyTeam(token) {
  const response = await fetch('http://localhost:3000/teams/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return await response.json()
}
