import { Versions } from './badges';

export type BadgesMapBySetID = Record<
    string,
    { set_id: string; versions: Versions }
>;
