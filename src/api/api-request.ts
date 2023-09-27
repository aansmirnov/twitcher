import { useToast } from '@chakra-ui/react';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export class ApiRequest {
    provider: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.provider = instance;

        this.provider.interceptors.request.use((request) => {
            return request;
        });

        this.provider.interceptors.response.use((response: AxiosResponse) => {
            return response.data;
        }, (error: AxiosError) => {
            const toast = useToast();
            toast({ status: 'error', duration: 1000, description: error.message });
        });
    }
}
