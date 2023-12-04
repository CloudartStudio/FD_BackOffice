import { createContext } from "react";
import { useState } from "react";

const EditPageContext = createContext({
    PageInfo: null,
    setEditPage: function (notificationData) {},
});

export function EditPageContextProvider(props) {
    const [pageInfo, setPageInfo] = useState(null);

    function PageInfoHandler(PageInfoData) {
        setPageInfo(PageInfoData);
    }

    const context = {
        PageInfo: pageInfo,
        setEditPage: PageInfoHandler,
    };

    return <EditPageContext.Provider value={context}>{props.children}</EditPageContext.Provider>;
}

/*
{
                                                                    id: cellTd[0],
                                                                    name: cellTd[1],
                                                                    link: cellTd[2],
                                                                    role: cellTd[3],
                                                                    relatedSections: JSON.stringify(cellTd[4]),
                                                                }
*/

export default EditPageContext;
