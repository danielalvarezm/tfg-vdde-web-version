/* eslint-disable @typescript-eslint/no-unused-vars */
import { instance } from "./axiosInstance";

class PopulationService {
    private population: any;

    constructor() {
        this.population = this.obtainData();
    }

    async obtainData() {
        const response = await instance.get("poblacion");
        return response.data;
    }

    getPopulation() {
        return this.population;
    }

    getYearsAsLabels(population: any) {
        const years: any = [];
        const values = population[0].total_values;
        for (let i = 0; i < values.length; i++) {
            years.push(values[i].interval);
        }

        return years;
    }

    getAutonomousCommunitiesAsLabels(population: any) {
        return population.map((item: any) => {
            return item.ccaa;
        });
    }

    filter(population: any, year = "0", genders: any, autonomousCommunityName: string) {
        if (autonomousCommunityName != "Todas las comunidades") {
            return this.filterByAutonomousCommunity(
                population,
                genders,
                autonomousCommunityName
            );
        }

        return this.filterByGenderBasedOnYear(population, year, genders);
    }

    filterByAutonomousCommunity(population: any, genders: any, autonomousCommunityName: string) {
        let autonomousCommunityContent: any = [];
        for (let i = 0; i < population.length; i++) {
            if (autonomousCommunityName != population[i].ccaa) {
                continue;
            }
            autonomousCommunityContent = population[i];
        }

        return this.filterByGenderBasedOnAutonomousCommunity(autonomousCommunityContent, genders);
    }

    filterByGenderBasedOnYear(population: any, year: string, genders: any) {
        const finalDataset: any = [];
        genders.forEach((gender: any) => {
            const dataFiltered: any = [];

            if (gender == "total") {
                for (let i = 0; i < population.length; i++) {
                    const data = population[i].total_values.filter(
                        (location: any) => location.interval == year
                    );
                    dataFiltered.push(data[0].value);
                }

                finalDataset.push({
                    label: "Total",
                    backgroundColor: "rgba(71,102,255,1)",
                    data: dataFiltered,
                });

            } else if (gender == "male") {
                for (let i = 0; i < population.length; i++) {
                    const data = population[i].male_values.filter(
                        (location: any) => location.interval == year
                    );
                    dataFiltered.push(data[0].value);
                }

                finalDataset.push({
                    label: "Hombre",
                    backgroundColor: "rgba(17,219,156,1)",
                    data: dataFiltered,
                });

            } else {
                for (let i = 0; i < population.length; i++) {
                    const data = population[i].female_values.filter(
                        (location: any) => location.interval == year
                    );
                    dataFiltered.push(data[0].value);
                }

                finalDataset.push({
                    label: "Mujer",
                    backgroundColor: "rgba(176,56,219,1)",
                    data: dataFiltered,
                });
            }
        });

        return finalDataset;
    }

    filterByGenderBasedOnAutonomousCommunity(autonomousCommunityContent: any, genders: any) {
        const finalDataset: any = [];

        genders.forEach((gender: any) => {
            const dataFilteredByOneGender: any = [];
            if (gender == "total") {
                const autonomousCommunityTotalValues = autonomousCommunityContent.total_values;
                for (let i = 0; i < autonomousCommunityTotalValues.length; i++) {
                    dataFilteredByOneGender.push(autonomousCommunityTotalValues[i].value);
                }

                finalDataset.push({
                    label: "Total",
                    backgroundColor: "rgba(71,102,255,1)",
                    data: dataFilteredByOneGender,
                });

            } else if (gender == "male") {
                const autonomousCommunityMaleValues = autonomousCommunityContent.male_values;
                for (let i = 0; i < autonomousCommunityMaleValues.length; i++) {
                    dataFilteredByOneGender.push(autonomousCommunityMaleValues[i].value);
                }

                finalDataset.push({
                    label: "Hombre",
                    backgroundColor: "rgba(17,219,156,1)",
                    data: dataFilteredByOneGender,
                });

            } else {
                const autonomousCommunityFemaleValues = autonomousCommunityContent.female_values;
                for (let i = 0; i < autonomousCommunityFemaleValues.length; i++) {
                    dataFilteredByOneGender.push(
                        autonomousCommunityFemaleValues[i].value
                    );
                }

                finalDataset.push({
                    label: "Mujer",
                    backgroundColor: "rgba(176,56,219,1)",
                    data: dataFilteredByOneGender,
                });
            }
        });

        return finalDataset;
    }
}

// Si se selecciona la comunidad autónoma, se deshabilita la casilla de año, ya que si eliges una comunidad autónoma, es para ver los valores de esa comunidad

export { PopulationService };
