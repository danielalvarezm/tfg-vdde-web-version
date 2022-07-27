/* eslint-disable @typescript-eslint/no-unused-vars */
import { instance } from "./axiosInstance";

class InfantDefunctionsService {
    private infantDefunctions: any;

    constructor() {
        this.infantDefunctions = this.obtainData();
    }

    async obtainData() {
        const response = await instance.get("defunciones-infantiles");
        return response.data;
    }

    getinfantDefunctions() {
        return this.infantDefunctions;
    }

    getYearsAsLabels(infantDefunctions: any) {
        const years: any = [];
        infantDefunctions.forEach((content: any) => {
            years.push(content.interval);
        });

        return years;
    }

    filter(infantDefunctions: any) {
        const finalDataset: any = [];
        const datasetFiltered: any = [];

        infantDefunctions.forEach((content: any) => {
            datasetFiltered.push(content.value);
        });

        finalDataset.push({
            label: "Total",
            backgroundColor: "rgba(71,102,255,1)",
            data: datasetFiltered,
        });

       return finalDataset;
    }

}

export { InfantDefunctionsService };
