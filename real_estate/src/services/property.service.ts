import { Property } from "../models/property.model";

interface ApiResponse {
    data: any;
    error?: string;
}
export class PropertyService {

    async addProperty(property: FormData): Promise<ApiResponse> {
        try {
            console.log(property)
            const response = await fetch("http://localhost:80/property", {
                method: 'POST',
                // headers: {
                //     'Content-Type': 'application/json'
                // },
                body: property
            });
            const data = await response.json();
            if (response.ok) {
                return { data };
            } else {
                return { data, error: response.statusText };
            }
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }
    async getProperty(): Promise<ApiResponse> {
        try {
            const response = await fetch("http://localhost:80/property");
            const data = await response.json();
            if (response.ok) {
                return { data };
            } else {
                return { data, error: response.statusText };
            }
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }

    async getPropertyById(id: string): Promise<ApiResponse> {
        const response = await fetch(`http://localhost:80/property/detail?id=${id}`);
        const data = await response.json();
        if (response.ok) {
            return { data };
        } else {
            return { data, error: response.statusText };
        }
    }
    async saveProperty(userId: string, propertyId: string): Promise<ApiResponse> {
        try {
            const response = await fetch("http://localhost:80/property/savedproperties", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, propertyId }),
            });
            const data = await response.json();
            if (response.ok) {
                return { data };
            } else {
                return { data, error: response.statusText };
            }
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }
    async deleteSavedProperty(id: string) {
        try {
            const response = await fetch(`http://localhost:80/property/savedproperties?id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Property deleted successfully');
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.error(error);
        }
    }
    async getSavedPropertyByUserId(userid: string): Promise<ApiResponse> {
        // try {
        const response = await fetch(`http://localhost:80/property/savedpropertiesbyuserid?userid=${userid}`);
        const data = await response.json();
        if (response.ok) {
            return { data };
        } else {
            return { data, error: response.statusText };
        }
        // } catch (error: any) {
        //     return { data: null, error: error.message };
        // }
    }
    async chnagePropertyStatus(id: string, status: string): Promise<ApiResponse> {
        console.log(id)
        const response = await fetch("http://localhost:80/property/changestatus", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,status})
        });
        const data = await response.json();
        if (response.ok) {
            return { data };
        } else {
            return { data, error: response.statusText };
        }
    }
    async addDocumentsByPropertyIdUserId(formData: FormData): Promise<ApiResponse> {
        // try {
        console.log(formData)
        const response = await fetch("http://localhost:80/property/uploadfiles", {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            body: formData
        });
        const data = await response.json();
        if (response.ok) {
            return { data };
        } else {
            return { data, error: response.statusText };
        }
    }
    async getDocumentsByPropertyIdAndUserID(userId: string, propertyId: string): Promise<ApiResponse> {
        console.log(propertyId)
        const response = await fetch(`http://localhost:80/property/getfiles?userId=${userId}&propertyId=${propertyId}`);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            return { data };
        } else {
            return { data, error: response.statusText };
        }
    }
    async getAllDocumentsByPropertyId(propertyId: string): Promise<ApiResponse> {
        console.log(propertyId)
        const response = await fetch(`http://localhost:80/property/getallfilesbypropertyId?propertyId=${propertyId}`);
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            return { data };
        } else {
            return { data, error: response.statusText };
        }
    }
    async addBuilder(builder:any): Promise<ApiResponse> {
        try {
            const response = await fetch("http://localhost:80/property/addbuilder", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: builder,
            });
            const data = await response.json();
            if (response.ok) {
                return { data };
            } else {
                return { data, error: response.statusText };
            }
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }
    async getFile(fileid:string):Promise<ApiResponse> {
        try {
            const response = await fetch(`http://localhost:80/property/files?id=${fileid}`);
            const data = await response.blob();
            if (response.ok) {
                return { data };
            } else {
                return { data, error: response.statusText };
            }
        } catch (error: any) {
            return { data: null, error: error.message };
        }
    }

}