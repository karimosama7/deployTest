import api from './api';

export const fileService = {
    /**
     * Upload multiple files and return their URLs
     */
    async uploadFiles(files: File[]): Promise<string[]> {
        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        const response = await api.post('/files/upload-multiple', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.urls;
    },

    /**
     * Upload a single file and return its URL
     */
    async uploadFile(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.url;
    },

    /**
     * Delete a file by its URL
     */
    async deleteFile(fileUrl: string): Promise<void> {
        // Extract filename from URL
        const filename = fileUrl.split('/').pop();
        if (filename) {
            await api.delete(`/files/${filename}`);
        }
    }
};
