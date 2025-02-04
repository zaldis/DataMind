const domain: string = "http://127.0.0.1:8000"
let token: string = '';


export async function login(username: string, password: string): Promise<string> {
     const formData = new FormData();
     formData.append('username', username);
     formData.append('password', password);
     const response = await fetch(`${domain}/login`, {
         method: "POST",
         body: formData
     });
     if (response.status === 200) {
         const json = await response.json();
         token = json["access_token"];
         localStorage.setItem('token', token);
         return token;
     }

     console.log(response);
}


export async function getInsights(startDate: Date): Promise<object> {
    const url = new URL(`${domain}/insight`);
    url.search = new URLSearchParams({ from_date: startDate.toISOString() }).toString();
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${_getToken()}`
        }
    });
    if (response.status === 200) {
         return await response.json();
    }
    console.log(response);
}


export async function addInsight(createdAt: Date, insightType: string, insightSeverity: string) {
    const url = new URL(`${domain}/insight`);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${_getToken()}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            created_at: createdAt,
            type: insightType,
            severity: insightSeverity
        })
    });
    if (response.status === 201) {
         return await response.json();
    }
    console.log(response);
}


function _getToken(): string {
    if (!token) {
        token = localStorage.getItem('token');
    }
    return token
}