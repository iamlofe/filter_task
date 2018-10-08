import { Map, List, Record } from 'immutable';

import { CurrentContext } from 'main-page/records/filter-record';
import DemisionsRecord from 'main/records/dimensions-record';
import ContextRecord from 'main/records/contexts-record';
import ResultsRecord from 'main/records/results-record';
import { Context } from 'main/records/contexts-record';
import { Demisions } from 'main/records/dimensions-record';
import { Results } from 'main/records/results-record';

export const getMockState = () => ({
    filterReducer: new Map({
        test: new CurrentContext({
            searchTitle: '',
            searchType: 'beginWith',
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({
                1: new Map({
                    2: new List(['1'])
                })
            })
        })
    })
});

export const getMockStateMain = () => ({
    mainReducer: new Map({
        initialDataFilter: new Map()
    })
});

export const getMockStateMainItems = searchType => ({
    filterReducer: new Map({
        test: new CurrentContext({
            searchTitle: '',
            searchType,
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({
                37: new Map({
                    28: new List(['10']),
                    29: new List(['4'])
                }),
                38: new Map({
                    31: new List(['1'])
                })
            })
        })
    }),
    mainReducer: new Map({
        initialDataFilter: new List([
            new Context({
                id: '37',
                contextId: '37',
                title: 'context',
                listsDimensions: new List([
                    new Demisions({
                        id: '28',
                        title: 'testDem',
                        contextId: '37',
                        demisionId: '28',
                        listsResults: new List([
                            new Results({
                                id: '1',
                                title: 'testRes',
                                contextId: '37',
                                demisionId: '28',
                                resultId: '1'
                            })
                        ])
                    })
                ])
            }),
            new Context({
                id: '38',
                contextId: '38',
                title: 'context',
                listsDimensions: new List([
                    new Demisions({
                        id: '31',
                        title: 'testDem',
                        contextId: '38',
                        demisionId: '31',
                        listsResults: new List([
                            new Results({
                                id: '10',
                                title: 'testRes',
                                contextId: '38',
                                demisionId: '31',
                                resultId: '10'
                            })
                        ])
                    })
                ])
            })
        ])
    })
});

export const mockCurrentFilter = new Record({
    searchTitle: null,
    searchType: null,
    contextIds: null
});

export const getMockFilter = (filterId, contextId, demisionId, resultId) =>
    new CurrentContext({
        searchTitle: '',
        searchType: 'beginWith',
        isSaving: false,
        isRestoring: false,
        contextIds: new Map({
            [contextId]: new Map({
                [demisionId]: new List([resultId])
            })
        })
    });

export const getMockFilterState = (filterId, contextId, demisionId, resultId) =>
    new Map({
        [filterId]: new CurrentContext({
            searchTitle: '',
            searchType: 'beginWith',
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({
                1: new Map({
                    2: new List(['1'])
                })
            })
        })
    });

export const getMockFilterStateWithExistsResult = resultId =>
    new Map({
        testId: new CurrentContext({
            searchTitle: '',
            searchType: 'beginWith',
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({
                1: new Map({
                    2: new List(['1', resultId])
                })
            })
        })
    });
// Context id
export const getMockStateWithExistsContextId = contextId =>
    new Map({
        testId: new CurrentContext({
            searchTitle: '',
            searchType: 'beginWith',
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({
                [contextId]: new Map()
            })
        })
    });

export const getMockStateWithExistsContextIdEqual = () =>
    new Map({
        testId: new CurrentContext({
            searchTitle: '',
            searchType: 'beginWith',
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({})
        })
    });

export const getMockStateRestoringData = () =>
    new Map({
        searchTitle: '',
        searchType: 'beginWith',
        contextIds: new Map({})
    });
// Demision id
export const getMockStateWithExistsDemisionId = (contextId, demisionId) =>
    new Map({
        testId: new CurrentContext({
            searchTitle: '',
            searchType: 'beginWith',
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({
                [contextId]: new Map({
                    [demisionId]: new List()
                })
            })
        })
    });

export const getMockStateWithExistsDemisionIdEqual = contextId =>
    new Map({
        testId: new CurrentContext({
            searchTitle: '',
            searchType: 'beginWith',
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({
                [contextId]: new Map({})
            })
        })
    });

export const getMockStateFilterForDeliting = () =>
    new Map({
        testId: new CurrentContext({
            searchTitle: '',
            searchType: 'beginWith',
            isSaving: false,
            isRestoring: false,
            contextIds: new Map({
                test: new Map({})
            })
        })
    });

export const getMockStateFilter = () => ({
    filterReducer: new Map({
        initialState: new ContextRecord({
            id: 1,
            contextId: 1,
            title: 'context1',
            listsDimensions: new List([
                new DemisionsRecord({
                    id: 2,
                    demisionId: 2,
                    contextId: 1,
                    title: 'demisi1context1',
                    listsResults: new List([
                        new ResultsRecord({
                            id: 3,
                            demisionId: 2,
                            contextId: 1,
                            resultId: 3,
                            title: 'results'
                        }),
                        new ResultsRecord({
                            id: 4,
                            demisionId: 2,
                            contextId: 1,
                            resultId: 4,
                            title: 'results'
                        }),
                        new ResultsRecord({
                            id: 4,
                            demisionId: 2,
                            contextId: 1,
                            resultId: 4,
                            title: 'results'
                        })
                    ])
                })
            ])
        })
    })
});

export const getMockListItems = () =>
    new List([
        new ResultsRecord({
            id: 3,
            demisionId: 2,
            contextId: 1,
            resultId: 3,
            title: 'results'
        }),
        new ResultsRecord({
            id: 4,
            demisionId: 2,
            contextId: 1,
            resultId: 4,
            title: 'results2'
        })
    ]);
