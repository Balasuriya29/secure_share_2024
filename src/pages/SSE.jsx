import { useEffect } from "react";

const SSE = () => {
    useEffect(()=>{
        const sseData = document.getElementById("sse-data");
        const eventSource = new EventSource("http://localhost:3000/api/file/sdjfkds");
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            sseData.innerHTML += `<p>${data.message}</p>`;
        };

        eventSource.onerror = (error) => {
            console.error("SSE Error:", error);
            eventSource.close();
        }
    },[])

    return (
        <div id="sse-data">

        </div>
    )
}

export default SSE;