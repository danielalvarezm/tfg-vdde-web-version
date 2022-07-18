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

    filter(population: any, year = '0', genders: any, autonomousCommunityName: string) {
        if (autonomousCommunityName != 'Todas las comunidades') {
            return this.filterByAutonomousCommunity(population, genders, autonomousCommunityName);
        }

        return this.filterByGenderBasedOnYear(population, year, genders)
    }

    filterByAutonomousCommunity(population: any, genders: any, autonomousCommunityName: string) {
        let autonomousCommunityContent: any = []
        for (let i = 0; i < population.length; i++) {
            if (autonomousCommunityName != population[i].ccaa) {
                continue;
            }
            autonomousCommunityContent = population[i]
        }
        return this.filterByGenderBasedOnAutonomousCommunity(autonomousCommunityContent, genders);
    }

    filterByGenderBasedOnYear(population: any, year: string, genders: any) {
        const finalDataset: any = []
        genders.forEach((gender: any) => {
            const dataFiltered: any = [];

            if (gender == 'total') {
                for (let i = 0; i < population.length; i++) {
                    const data = population[i].total_values.filter((location: any) => location.interval == year)
                    dataFiltered.push(data[0].value);
                }

                finalDataset.push({
                    label: 'Total',
                    backgroundColor: '#4766FF',
                    data: dataFiltered
                });
            }

            else if (gender == 'male') {
                for (let i = 0; i < population.length; i++) {
                    const data = population[i].male_values.filter((location: any) => location.interval == year)
                    dataFiltered.push(data[0].value);
                }

                finalDataset.push({
                    label: 'Hombre',
                    backgroundColor: '#98CAFF',
                    data: dataFiltered
                });
            }

            else {
                for (let i = 0; i < population.length; i++) {
                    const data = population[i].female_values.filter((location: any) => location.interval == year)
                    dataFiltered.push(data[0].value);
                }

                finalDataset.push({
                    label: 'Mujer',
                    backgroundColor: '#BAA2FA',
                    data: dataFiltered
                });
            }
        });

        return finalDataset;
    }

    filterByGenderBasedOnAutonomousCommunity(autonomousCommunityContent: any, genders: any) {
        const finalDataset: any = []

        genders.forEach((gender: any) => {
            const dataFilteredByOneGender: any = [];
            if (gender == 'total') {
                const autonomousCommunityTotalValues = autonomousCommunityContent.total_values;
                for (let i = 0; i < autonomousCommunityTotalValues.length; i++) {
                    dataFilteredByOneGender.push(autonomousCommunityTotalValues[i].value);
                }

                finalDataset.push({
                    label: 'Total',
                    backgroundColor: '#4766FF',
                    data: dataFilteredByOneGender
                });
            }

            else if (gender == 'male') {
                const autonomousCommunityMaleValues = autonomousCommunityContent.male_values;
                for (let i = 0; i < autonomousCommunityMaleValues.length; i++) {
                    dataFilteredByOneGender.push(autonomousCommunityMaleValues[i].value);
                }

                finalDataset.push({
                    label: 'Hombre',
                    backgroundColor: '#98CAFF',
                    data: dataFilteredByOneGender
                });
            }

            else {
                const autonomousCommunityFemaleValues = autonomousCommunityContent.female_values;
                for (let i = 0; i < autonomousCommunityFemaleValues.length; i++) {
                    dataFilteredByOneGender.push(autonomousCommunityFemaleValues[i].value);
                }

                finalDataset.push({
                    label: 'Mujer',
                    backgroundColor: '#BAA2FA',
                    data: dataFilteredByOneGender
                });
            }
        });

        return finalDataset;
    }





    // filter(population: any, year = 0, gender: string, autonomousCommunityName: string) {
    //     if (autonomousCommunityName != 'all') {
    //         return this.filterByAutonomousCommunity(population, gender, autonomousCommunityName);
    //     }
    // }

    // filterByAutonomousCommunity(population: any, gender: string, autonomousCommunityName: string) {
    //     const datasetFiltered: any = [];
    //     for (let i = 0; i < population.length; i++) {
    //         if (autonomousCommunityName != population[i].ccaa) {
    //             return;
    //         }

    //         //TODO: a lo mejor estos metodos se pueden sacar a un filter by gender
    //         if (gender == 'total') {
    //             const autonomousCommunityTotalValues = population[i].total_values;
    //             for (let i = 0; i < autonomousCommunityTotalValues.length; i++) {
    //                 datasetFiltered.push(autonomousCommunityTotalValues[i].value);
    //             }
    //             return datasetFiltered;
    //         }

    //         else if (gender == 'male') {
    //             const autonomousCommunityMaleValues = population[i].male_values;
    //             for (let i = 0; i < autonomousCommunityMaleValues.length; i++) {
    //                 datasetFiltered.push(autonomousCommunityMaleValues[i].value);
    //             }
    //             return datasetFiltered;
    //         }

    //         const autonomousCommunityFemaleValues = population[i].female_values;
    //         for (let i = 0; i < autonomousCommunityFemaleValues.length; i++) {
    //             datasetFiltered.push(autonomousCommunityFemaleValues[i].value);
    //         }

    //         return datasetFiltered;
    //     }
    // }
}

// Si se selecciona la comunidad autónoma, se deshabilita la casilla de año, ya que si eliges una comunidad autónoma, es para ver los valores de esa comunidad

// function getMalePopulation() {
// }

// function getFemalePopulation() {
// }


export { PopulationService };
