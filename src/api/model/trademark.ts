export interface TrademarkData {
	id?: number;
	tmName: string;
	logoUrl: string;
}
export type TrademarkListData = {
	records: TrademarkData[];
	total: number;
	size: number;
	current: number;
	searchCount: boolean;
	pages: number;
};
