export async function editUser(userId, details){   
    fetch("http://localhost:5000/users/" + userId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    });
}

export async function getData(url){
    let data = await fetch("http://localhost:5000/"+url);
    return await data.json();
}

export async function addUser(userDetails){
    await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
  };