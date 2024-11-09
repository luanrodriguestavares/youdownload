export const handleDownload = async (url, setLoading, showToast, setUrl) => {
    if (!url) {
        showToast('Por favor, insira uma URL válida.', 'danger');
        return;
    }

    setLoading(true);

    try {
        const response = await fetch('https://youdownload-ws.onrender.com/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'audio.mp4';

            if (contentDisposition) {
                const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    filename = matches[1].replace(/['"]/g, '');
                }
            }

            const downloadUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();

            showToast('Download iniciado com sucesso!', 'success'); 

        } else {
            const error = await response.json();
            showToast(`Erro: ${error.error}`, 'danger');
        }
    } catch (error) {
        showToast(`Erro ao baixar o áudio: ${error.message}`, 'danger');
    } finally {
        setUrl('');
        setLoading(false);
    }
};
