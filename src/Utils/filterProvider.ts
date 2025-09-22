import {ProviderTv} from "../entites/ProviderTv";

export function filterFrProviders(data: any) {
    return data.results?.FR || null;
}
