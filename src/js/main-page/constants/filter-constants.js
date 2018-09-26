export const SearchTypes = {
    BEGIN_WITH: 'beginWith',
    EXACT_MATCH: 'exactMatch',
    OVERLAP: 'overlap'
};

export const SearchTypesLabels = {
    [SearchTypes.BEGIN_WITH]: '*',
    [SearchTypes.EXACT_MATCH]: '**',
    [SearchTypes.OVERLAP]: 'A-Z'
};
