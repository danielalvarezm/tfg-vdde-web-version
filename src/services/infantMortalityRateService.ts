/* eslint-disable @typescript-eslint/no-unused-vars */
import { instance } from "./axiosInstance";

class InfantMortalityRateService {
    private infantMortalityRate: any;

    constructor() {
        this.infantMortalityRate = this.obtainData();
    }

    async obtainData() {
        const response = await instance.get("tasa-de-mortalidad-infantil");
        return response.data;
    }

    getInfantMortalityRate() {
        return this.infantMortalityRate;
    }

    getYearsAsLabels(infantMortalityRate: any) {
        const years: any = [];
        infantMortalityRate.forEach((content: any) => {
            years.push(content.year);
        });

        return years;
    }

    filter(infantMortalityRate: any, genders: any) {
        const finalDataset: any = [];

        genders.forEach((gender: any) => {
            const datasetFilteredByOneGender: any = [];
            if (gender == "total") {
                infantMortalityRate.forEach((content: any) => {
                    datasetFilteredByOneGender.push(content.total_value);
                });

                finalDataset.push({
                    label: "Total",
                    backgroundColor: "rgba(71,102,255,1)",
                    data: datasetFilteredByOneGender,
                });
            }
            else if (gender == "male") {
                infantMortalityRate.forEach((content: any) => {
                    datasetFilteredByOneGender.push(content.male_value);
                });

                finalDataset.push({
                    label: "Hombre",
                    backgroundColor: "rgba(17,219,156,1)",
                    data: datasetFilteredByOneGender,
                });
            }
            else {
                infantMortalityRate.forEach((content: any) => {
                    datasetFilteredByOneGender.push(content.male_value);
                });

                finalDataset.push({
                    label: "Mujer",
                    backgroundColor: "rgba(176,56,219,1)",
                    data: datasetFilteredByOneGender,
                });
            }
        });

        return finalDataset;
    }

}

export { InfantMortalityRateService };
