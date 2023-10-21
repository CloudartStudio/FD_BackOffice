export type TableDTO = {
    head_data: TableTuple[];
    body_data: TableTuple[];
    footer_actions: any[];
};

export type TableTuple = {
    id: number;
    col: TableTupleData[];
    footer_actions: any[];
};

export type TableTupleData = {
    id: number;
    label: number;
};
