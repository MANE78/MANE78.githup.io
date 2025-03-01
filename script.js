document.getElementById('download-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const videoUrl = document.getElementById('video-url').value;
    const format = document.getElementById('format').value;
    
    fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: videoUrl, format: format })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const a = document.createElement('a');
            a.href = data.file;
            a.download = '';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            document.getElementById('message').textContent = 'Download started!';
        } else {
            document.getElementById('message').textContent = 'Failed to download video.';
        }
    })
    .catch(error => {
        document.getElementById('message').textContent = 'An error occurred.';
    });
});