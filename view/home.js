const token = new URLSearchParams(window.location.search).get('access_token');

document.getElementById('generate').addEventListener('click', function() {
  fetch('/playlists', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log('success' + data)
    })
    .catch((error) => console.log(error))
})

async function fetchProfile(code) {
  const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET", headers: { Authorization: `Bearer ${code}` }
    });

  return await result.json();
}

function populateUI(profile) {
    document.getElementById("displayName").innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        document.getElementById("avatar").appendChild(profileImage);
    }
    document.getElementById("id").innerText = profile.id;
    document.getElementById("email").innerText = profile.email;
    document.getElementById("uri").innerText = profile.uri;
    document.getElementById("uri").setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url").innerText = profile.href;
    document.getElementById("url").setAttribute("href", profile.href);
}

async function fetchUserTopItems(code) {
  const result = await fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET", headers: { Authorization: `Bearer ${code}` }
  });

  return await result.json();
}

async function getProfileAndPopulateUI() {
    const profile = await fetchProfile(token);
    populateUI(profile);

    const topItems = await fetchUserTopItems(token);
    console.log(topItems);
}

getProfileAndPopulateUI();

