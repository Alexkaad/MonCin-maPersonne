import {ExternalIds} from "../entites/ExternalIds";

export function mapExternalIds(raw : any): ExternalIds {

    return {

        id : raw.id,
        wikidata_id: raw.wikidata_id,
        facebook_id: raw.facebook_id,
        twitter_id : raw.twitter_id,
        instagram_id : raw.instagram_id,
        tiktok_id: raw.tiktok_id,
        youtube_id: raw.youtube_id

    }


}