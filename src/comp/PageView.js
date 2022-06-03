import React, { useEffect, useState } from "react"
import { format } from 'date-fns'
import './DocumentPage.css';
import DBchange from './DBchange.js'
import { ConflictResolutionMode } from "@azure/cosmos";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faT, faLink, faList, faCheckSquare, faPoo, faArrowDown, faPalette, faPenToSquare, faW, faBook, faFileLines, faGear, faTrash, faCircleCheck, faCircleXmark, faBookOpen, faGripLines } from '@fortawesome/free-solid-svg-icons'
import './Bars.css';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
 
if (localStorage.getItem("storageType") === null) {
    localStorage.setItem("storageType", "local")
}


const localData = [
    {
        id: 0,
        pageAuthor: "Paper Wiki",
        pageContent: "* Determines how pages are viewed in sidebar\n* Hashtag for each new item.\n* Name of index - page index(See below list for indexes) - Indentation  \n\n# Example page!, 1,0\n# New page! 💪,2,1 \n\n",
        pageLastChanged: "05/31/2022 - 20:12",
        pageName: "Index",
    },
    {
        id: 1,
        pageAuthor: "Paper Wiki",
        pageContent: "<!text, 30, bold, #171725, left!>\nExample Page!\n<!line, 100,1!> \n<!text, 18, normal, #2E2E3C, left!>🐑 Lorem  ss ipsssum dolor sit amet, consectetur adipiscing elit. Sed ultrices laoreet velit at vehicula. Mauris efficitur ultricies sapien molestie sapien. Ut egestas diam eget lorem tincidunt eleifend. 🤩 Nam porttitor posuere lacus, nec pellentesque nisl lacinia  \n<!break!>    \n<!text, 30, bold, #171725, left!>\nHeader\n<!line, 100,1!> \n<!text, 18, normal, #2E2E3C, left!> Lorem  ss ipsssum dolor sit amet, consectetur adipiscing elit. Sed ultrices laoreet velit at vehicula. Mauris efficitur ultricies sapien molestie sapien. Ut egestas diam eget lorem.\n<!break!>  \n<!checkbox, 18 , normal , #121212 , left , true !> List item 1 📌\n<!checkbox, 18 , normal , #121212 , left , true !> List item 2\n<!checkbox, 18 , normal , #121212 , left , true !> List item 3\n<!checkbox, 18 , bolder , #ff0202 , left , true !> List item 4❗\n<!break!>   \n  \n<!url, 18 , Google , https://www.google.com !>\n<!url, 18 , GitHub, https://github.com/Bratz89 !>  \n\n<!text, 25, normal, #2E2E3C, center!>\nLines!\n\n<!line, 100,6!> \n<!line, 90,5!> \n<!line, 80,4!> \n<!line, 70,3!> \n<!line, 60,2!> \n<!line, 50,1!> \n<!text, 16 , bolder , #f74949 , center!> Text!\n<!line, 50, 1 , #376dd8 !>\n<!line, 60 , 2 , #376dd8 !>\n<!line, 70 , 3 , #376dd8 !>\n<!line, 80 , 4 , #376dd8 !>\n<!line, 90 , 5 , #376dd8 !>\n<!line, 100 , 6 , #376dd8 !>\n\n<!break!>   \n<!break!>   \n<!text, 18, normal, #e55039, left!> Lorem ipsum dolor sit amet, consectetur adipiscing elit.   \n<!text, 18, normal, #e55039, right!> Lorem ipsum dolor sit amet, consectetur adipiscing elit.  \n<!text, 18, normal, #e55039, left!> Lorem ipsum dolor sit amet, consectetur adipiscing elit.   \n<!text, 18, normal, #e55039, right!> Lorem ipsum dolor sit amet, consectetur adipiscing elit.   \n<!break!>  \n<!text, 25, bolder, #2E2E3C, center!>WASABEE\n<!line,60,3, #171725 !>  \n<!list, 18, normal, #2E2E3C, center!>Lorem ipsum dolor sit amet, consectetur\n<!list, 18, normal, #2E2E3C, center!>Lorem ipsum dolor sit amet, consectetur\n<!list, 18, normal, #2E2E3C, center!>Lorem ipsum dolor sit amet, consectetur\n<!list, 18, normal, #2E2E3C, center!>Lorem ipsum dolor sit amet, consectetur\n<!line, 60,3, #171725 !>  \n <!break!>  \n<!checkbox, 20, bold, #badc58, left !>A checkbox 🚩\n<!checkbox, 30, bold, #71A9F7, left , true!>Another  checkbox ⛔ \n<!line, 1,100, #171725 !>\n\n\n\n<!checkbox, 18 , bolder , #ff0000 , left , false !> \nYour text!\n \n\n\n\n\n\n\n\n",
        pageLastChanged: "05/31/2022 - 20:12",
        pageName: "Example page!",
    },
    {
        id: 2,
        pageAuthor: "Paper Wiki",
        pageContent: '<!text, 18, normal, #171725, left!>\nYour new page 😎!\n',
        pageLastChanged: "05/31/2022 - 20:12",
        pageName: "New page!",
    }
];
if (localStorage.localData === undefined) {
    localStorage.setItem("localData", JSON.stringify(localData))
}


const PageView = (updateData) => {
    const [data, setdata] = useState("");
    const [indexData, setindex] = useState("");
    const [pages, setpages] = useState("");
    const [value, setValue] = useState("<!text, 18, normal, #e55039, left!> Wazaabee!")
    const [editMode, seteditMode] = useState(false)

    async function GetByID(index, saving) {
        if (localStorage.storageType === "cosmoDB") {
            if (index == 0 || saving) { seteditMode(true) }
            else { seteditMode(false) }
            try {
                setdata(await DBchange("GetPageByID", index))
                let value = await DBchange("GetPageByID", index)
                setValue(value.pageContent)
                seteditPageName(value.pageName)
            }
            catch { console.log("Error: Did not find page Index"); alert("Could not find page. Try editing your Index page!") }
        }
        if (localStorage.storageType === "local") {
            if (index == 0 || saving) { seteditMode(true) }
            else { seteditMode(false) }
            try {
                setdata(JSON.parse(localStorage.localData)[index])
                let value = JSON.parse(localStorage.localData)[index]
                setValue(value.pageContent)
                seteditPageName(value.pageName)
            }
            catch { console.log("Error: Did not find page Index"); alert("Could not find page. Try editing your Index page!") }
        }
    }

    async function GetIndex() {
        if (localStorage.storageType === "cosmoDB") {
            setindex(await DBchange("GetPageByID", 0))
        }
        if (localStorage.storageType === "local") {
            setindex(JSON.parse(localStorage.localData)[0])
        }

    }

    async function GetPageIndexes() {
        if (localStorage.storageType === "cosmoDB") {
            setpages(await DBchange("GetPages"))
            setwd(true)
        }


        if (localStorage.storageType === "local") {
            setpages(JSON.parse(localStorage.localData))
            setwd(true)
        }


    }

    async function EditSave() {
        let newDate = format(new Date(), 'MM/dd/yyyy - HH:mm')

        if (editPageName === undefined) { editPageName = "Untitled" + data.id }
        const newItem = { id: data.id, };
        const { id } = newItem;
        newItem.pageName = editPageName;
        newItem.pageLastChanged = newDate;
        try { newItem.pageAuthor = localStorage.userName; }
        catch { newItem.pageAuthor = "Anon"; }

        newItem.pageContent = value;
        if (localStorage.storageType === "cosmoDB") {
            await DBchange("ChangePage", data.id, newItem)
        }
        if (localStorage.storageType === "local") {
            let array = JSON.parse(localStorage.localData)
            let objIndex = array.findIndex((obj => obj.id == data.id))
            array[objIndex] = newItem
            localStorage.setItem("localData", JSON.stringify(array))
        }
        let saving = true
        GetByID(data.id, saving)
        GetPageIndexes()
        GetIndex(data.id)
    }

    async function CreateNewPage() {
        if (localStorage.storageType === "cosmoDB") {
            let newData = await DBchange("GetPages")
            let newDate = format(new Date(), 'MM/dd/yyyy - HH:mm')
            let newID = '' + newData.length

            const editPageName = "New Page!"
            const newItem = { id: newID, };
            const { id } = newItem;
            newItem.pageName = editPageName;
            newItem.pageLastChanged = newDate;
            newItem.pageAuthor = localStorage.userName;
            newItem.pageContent = "<!text, 18, normal, #2E2E3C , left!> Here is your new page!";

            const createdItem = await DBchange("NewPage", newID, newItem)
            GetPageIndexes()
            GetByID(createdItem.id)
        }
        if (localStorage.storageType === "local") {
            let newData = JSON.parse(localStorage.localData)
            let newDate = format(new Date(), 'MM/dd/yyyy - HH:mm')
            let newID = newData.length

            const editPageName = "New page!"
            const newItem = { id: newID, };
            const { id } = newItem;
            newItem.pageName = editPageName;
            newItem.pageLastChanged = newDate;
            newItem.pageAuthor = localStorage.userName;
            newItem.pageContent = "<!text, 18, normal, #2E2E3C , left!> Here is your new page!";

            newData.push(newItem)
            localStorage.setItem("localData", JSON.stringify(newData))
            GetPageIndexes()
            GetByID(newItem.id)
        }
    }



    const [deletePageCheckShow, setdeletePageCheckShow] = useState(false);
    function CheckDeletePage() {
        if (deletePageCheckShow) { setdeletePageCheckShow(false) }
        if (!deletePageCheckShow) { setdeletePageCheckShow(true) }
    }
    async function DeletePage() {
        if (localStorage.storageType === "cosmoDB") {
            const idToDelete = '' + data.id
            await DBchange("DeletePage", idToDelete, 0, idToDelete)
            setdeletePageCheckShow(false)
            GetPageIndexes()
            GetByID(0)
            CheckDeletePage()
        }

        if (localStorage.storageType === "local") {
            setdeletePageCheckShow(false)
            let newDate = format(new Date(), 'MM/dd/yyyy - HH:mm')
            if (editPageName === undefined) { editPageName = "Untitled" + data.id }
            const newItem = { id: data.id, };
            const { id } = newItem;
            newItem.pageName = "!*deleted*!";
            newItem.pageLastChanged = newDate;
            try { newItem.pageAuthor = "Deleted by: " + localStorage.userName; }
            catch { newItem.pageAuthor = "Anon"; }
            newItem.pageContent = "";
            let array = JSON.parse(localStorage.localData)
            let objIndex = array.findIndex((obj => obj.id == data.id))
            array[objIndex] = newItem
            localStorage.setItem("localData", JSON.stringify(array))
            let saving = false
            GetByID(0, saving)
            GetPageIndexes()
            GetIndex(data.id)
        }

    }
    ///Remove childen
    Element.prototype.remove = function () {
        this.parentElement.removeChild(this);
    }
    NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] && this[i].parentElement) {
                this[i].parentElement.removeChild(this[i]);
            }
        }
    }
    const removeChildElement = () => {
        let childInt = 1

        while (childInt > 0) {
            let child = document.getElementById("previevContainer")

            if (child == null) {
                setNumChildren(0)
                childInt = 0
            } else {
                document.getElementById("previevContainer").remove();
            }
        }

    }
    const [numChildren, setNumChildren] = useState(0);
    const children = [];
    try {
        const defrag = data.pageContent.split('<!');

        defrag.slice(1).forEach(element => {

            let config = element.split('!>')[0]
            config = config.replace(/\s/g, "");
            let content = element.split('!>')[1]
            let color = config.split(',')[3]
            let type = config.split(',')[0]
            let weight = config.split(',')[2]
            let size = config.split(',')[1]
            let justify = config.split(',')[4]
            let arg6 = config.split(',')[5]

            for (var i = 0; i < numChildren; i++) {

                children.push(<ChildComponent
                    TYPE={type}
                    CONTENT={content}
                    COLOR={color}
                    SIZE={size}
                    WEIGHT={weight}
                    JUSTIFY={justify}
                    ARG6={arg6}
                    key={i}
                    number={i}

                />)
            }


        })
    }
    catch { console.log("Error: Invalid data in pageContent: ") }

    const addComponent = () => {
        if (numChildren === 0) {
            setNumChildren((count) => count + 1)

        } else {
            removeChildElement()
        }
    }
    const [wd, setwd] = useState(false);
    useEffect(() => {
        GetIndex()
        addComponent()
        GetPageIndexes()
    }, [])

    const onChange = (value) => { setValue(value) }
    const [editPageName, seteditPageName] = useState('')

    function toggleEditMode() {
        if (editMode) { seteditMode(false) }
        if (!editMode) { seteditMode(true) }
    }

    function SideBarItem(arg) {
        return (< div onClick={arg.onClick} className='Item' > <FontAwesomeIcon icon={arg.icon}></FontAwesomeIcon> <label> </label> </div>
        )
    }
    const [showToolTips, setshowToolTips] = useState(false);
    function ToggleToolTips() {
        showToolTips ? setshowToolTips(false) : setshowToolTips(true)
    }


    function SoftSettings() {

        const tempVar = localStorage.storageType === "cosmoDB"
        const [showCosmoSettings, setShowCosmoSettings] = useState(tempVar);

        const [softUserName, setSoftUserName] = useState("");
        function saveSettings() {
            if (softUserName === undefined || softUserName === "") { localStorage.setItem("userName", "Anon") }
            else { localStorage.setItem("userName", softUserName) }
            window.location.reload(false);
        }

        function ChangeDbType(arg) {
            localStorage.setItem("storageType", arg)
            if (arg === "cosmoDB") { setShowCosmoSettings(true) }
            if (arg === "local") { setShowCosmoSettings(false) }


        }

        return (
            <div style={{ position: "fixed", left: 250, top: 60, display: "flex", flexDirection: "column", zIndex: 9999, backgroundColor: "#171725", borderRadius: 5, color: "#FFFaF0", padding: 35, width: 450 }}>
                <label style={{ fontSize: 20, textDecoration: "underline", justifyText: "center" }}>Settings</label>
                <label style={{ fontSize: 16, }}>User name:
                    <input defaultValue={localStorage.userName} onChange={e => setSoftUserName(e.target.value)} style={{ marginTop: 20, backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 3 }} type="text" placeholder="..." />
                </label>


                <div style={{ display: "flex", marginTop: 20 }}>
                    {showCosmoSettings && <button className='ButtonOne' onClick={() => ChangeDbType("local")} style={{ fontSize: 14, marginRight: 5, width: 150 }}>Local storage</button>}
                    {!showCosmoSettings && <button className='ButtonOne' style={{ fontSize: 14, marginRight: 5, backgroundColor: "#585760", color: "#FFFaF0", width: 150 }}>Local storage</button>}
                    {!showCosmoSettings && <button className='ButtonOne' onClick={() => ChangeDbType("cosmoDB")} style={{ fontSize: 14, marginRight: 5, width: 150 }}>Cosmo DB storage</button>}
                    {showCosmoSettings && <button className='ButtonOne' style={{ fontSize: 14, marginRight: 5, backgroundColor: "#585760", color: "#FFFaF0", width: 150 }}>Cosmo DB storage</button>}
                </div>
                {!showCosmoSettings && <label>Local storage is selected. This will store pages in browser storage and you will lose all pages if cookies are deleted!</label>}
                {showCosmoSettings && <label>Cosmo DB is selected. This will store and get pages whit Azure Cosmo DB. Check out https://docs.microsoft.com/en-us/azure/cosmos-db/introduction for more information.</label>}

                {showCosmoSettings && <div style={{ display: "flex", flexDirection: "column" }}>   <label style={{ fontSize: 16, textDecoration: "underline", justifyText: "center", marginTop: 20 }}>Cosmo DB settings:</label>
                    <label style={{ fontSize: 16 }}>Endpoint:
                        <input defaultValue={localStorage.COSMOendpoint} onChange={e => localStorage.setItem("COSMOendpoint", e.target.value)} style={{ backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 3, width: 380 }} type="text" placeholder="https://....azure.com:987/" />
                    </label>
                    <label style={{ fontSize: 16 }}>API Key:
                        <input defaultValue={localStorage.COSMOapiKey} onChange={e => localStorage.setItem("COSMOapiKey", e.target.value)} style={{ backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 3, width: 380 }} type="text" placeholder="slkj1opvi12opm2..." />
                    </label>
                    <label style={{ fontSize: 16 }}>Database ID:
                        <input defaultValue={localStorage.COSMOdatabaseID} onChange={e => localStorage.setItem("COSMOdatabaseID", e.target.value)} style={{ backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 3, width: 300 }} type="text" placeholder="database name" />
                    </label>
                    <label style={{ fontSize: 16 }}>Container ID:
                        <input defaultValue={localStorage.COSMOcontainerID} onChange={e => localStorage.setItem("COSMOcontainerID", e.target.value)} style={{ backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 3, width: 300 }} type="text" placeholder="database1" />
                    </label>
                </div>}

                <div style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
                    <button className='ButtonOne' onClick={saveSettings} style={{ fontSize: 16, marginRight: 5, width: "100%" }}>Save</button>
                    <button className='ButtonOne' onClick={ToggleSettings} style={{ fontSize: 16, marginLeft: 5, width: "100%", backgroundColor: "#e55039" }}>Close</button>
                </div>
            </div >
        )
    }


    const [showSettings, setShowSettings] = useState(false);
    function ToggleSettings() {
        if (showSettings) { setShowSettings(false) }
        if (!showSettings) { setShowSettings(true) }
    }





    return (


        <div id='pageview' style={{ display: "flex", flexDirection: "row", marginTop: 15, marginRight: "auto", height: "100%", marginBottom: "auto" }}>
            <div className='IndexContainer'     >
                <label style={{ height: 15, fontSize: 19, color: "#FFFAF0", marginBottom: 10, marginTop: 20, marginRight: "auto", marginLeft: "auto" }} >Paper</label>
                <FontAwesomeIcon icon={faW} style={{ height: 30, color: "#FFFAF0", marginBottom: 40, marginTop: 0 }} />
                <div>
                    <input className="Search" type="text" name="name" placeholder="Search..." />
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 15 }}>
                        {!showToolTips && <SideBarItem onClick={ToggleToolTips} icon={faBook} style={{ height: 20, color: "#FFFAF0" }} />}
                        {showToolTips && <SideBarItem onClick={ToggleToolTips} icon={faBookOpen} style={{ height: 20, color: "#2E2E3C" }} />}
                        <SideBarItem onClick={CreateNewPage} icon={faFileLines} style={{ height: 20, color: "#FFFAF0" }} />
                        <SideBarItem onClick={ToggleSettings} icon={faGear} style={{ height: 20, color: "#FFFAF0" }} />
                    </div>
                </div>
                {wd && <button className="IndexButton" onClick={() => GetByID(0)}> {pages[0].pageName}</button>}



                {wd && indexData.pageContent != undefined && indexData.pageContent.split("#").slice(1).map(({ pageName, id }, index) => {
                    //indez  
                    try {

                        let documentName = indexData.pageContent.split("#").slice(1)[index].split(",")[0]
                        let documentID = indexData.pageContent.split("#").slice(1)[index].split(",")[1]
                        let documentPosition = indexData.pageContent.split("#").slice(1)[index].split(",")[2]
                        documentName = documentName.replace(/(\r\n|\n|\r)/gm, "");
                        documentID = documentID.replace(/(\r\n|\n|\r)/gm, "");
                        documentPosition = documentPosition.replace(/(\r\n|\n|\r)/gm, "");
                        documentID = parseInt(documentID)
                        documentPosition = parseInt(documentPosition)

                        if (documentPosition === 0) {
                            return (
                                <button style={{ marginLeft: 0, textDecoration: "underline" }} className="IndexButton" onClick={() => GetByID(documentID)}> {documentName}</button>
                            )
                        }
                        if (documentPosition === 1) {
                            return (
                                <button style={{ marginLeft: 20 }} className="IndexButton" onClick={() => GetByID(documentID)}> {documentName}</button>
                            )
                        }
                        if (documentPosition === 2) {
                            return (
                                <button style={{ marginLeft: 40 }} className="IndexButton" onClick={() => GetByID(documentID)}> {documentName}</button>
                            )
                        }
                        if (documentPosition === 3) {
                            return (
                                <button style={{ marginLeft: 60 }} className="IndexButton" onClick={() => GetByID(documentID)}> {documentName}</button>
                            )
                        }
                        else {
                            return (
                                <button style={{ marginLeft: 0 }} className="IndexButton" onClick={() => GetByID(documentID)}> {documentName}</button>
                            )
                        }

                    } catch { console.log("Error: Syntax error in Index page!") }

                })}



            </div>
            <div style={{ width: 200 }}></div>

            {showSettings && <SoftSettings></SoftSettings>}


            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}>

                {showToolTips && <div className="PreviewContainer" style={{ backgroundColor: "#171725" }}>
                    <div style={{ display: "flex", flexDirection: "column", margin: "flex", borderRadius: 5, height: "100%" }}>
                        <label style={{ marginLeft: "auto", marginRight: "auto", fontSize: 30, color: "#FFFAF0" }}> Syntax </label>
                        <div style={{ display: "flex", flexDirection: "column", backgroundColor: "#FFFAF0", padding: 10, borderRadius: 5, marginTop: 10, overflow: "scroll" }}>
                            <div style={{ display: "flex", flexDirection: "colrowumn" }}>
                                <div className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faT} /></div>
                                <label style={{ fontSize: 25, color: "#171725", marginLeft: 10, textDecoration: "underline" }}> Text elements </label>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <label style={{ fontSize: 16, color: "#171725" }}> Variables are comma separated and non case sensitive  </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> Type, font size, font style, font color, element position. </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> &lt;!text, 50, bold, #71A9F7 , left!&gt;    </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> &lt;!text = type of element    </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> 50 = fontsize (integer)   </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> bold = fontstyle (normal,bold, bolder, light, lighter)   </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> #71A9F7 = font color (normal,bold, bolder, light, lighter)   </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> Left = element position (left, center, right)   </label>'
                                <label style={{ fontSize: 16, color: "#171725", fontWeight: "bold" }}> Example:     </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> &lt;!text, 30, bold, #e55039 , center!&gt;  </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> This is a red bold text centered!  </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> &lt;!text, 16, normal, #2E2E3C , left!&gt;  </label>
                                <label style={{ fontSize: 16, color: "#171725" }}> And this is a green text!  </label>'
                                <label style={{ fontSize: 16, color: "#171725", fontWeight: "bold" }}> Result:  </label>
                                <label style={{ fontSize: 30, color: "#e55039", fontWeight: "bold", alignSelf: "center" }}> This is a red bold text centered! </label>
                                <label style={{ fontSize: 16, color: "#badc58", fontWeight: "normal" }}> And this is a green text!  </label>
                            </div>
                        </div>


                    </div>
                </div>}
                {editMode && wd && data.id !== undefined && <div className='EditContainer'>
                    <div style={{ display: "flex" }}>
                        <ToolBar />
                        <div style={{ position: "absolute", display: "flex", marginLeft: 465 }} >
                            <button onMouseDown={EditSave} className='ButtonOne' style={{ marginLeft: 10, backgroundColor: "#badc58" }}>Save</button>
                            {data.id != 0 && <button onMouseDown={toggleEditMode} className='ButtonOne' style={{ marginLeft: 10, backgroundColor: "#fbc531" }}>Close</button>}
                        </div >
                    </div>

                    {data.id != 0 && data.id !== undefined && <div >
                        <label>Page name: </label>
                        <input onChange={e => seteditPageName(e.target.value)} defaultValue={data.pageName} className='EditTextAreaTitle' type="text" />
                        <label style={{ marginLeft: 20 }}>Page ID: {data.id}</label>
                    </div>}


                    {data.id == 0 && <div style={{ marginTop: 15, marginBottom: 15 }}>
                        <label >Page name: Index</label>
                    </div>}


                    <textarea
                        className={"EditTextArea"}
                        defaultValue={value}
                        onChange={e => onChange(e.target.value)}
                    />




                    {wd && data.id == 0 && <label style={{ marginTop: 15 }}>Avaliable pages:</label>}
                    {wd && data.id == 0 && <label >ID: Name</label>}
                    {wd && data.id == 0 && pages.map(({ pageName, id }, index) => {
                        if (pageName === "!*deleted*!") { return }
                        return (
                            <label onClick={() => GetByID(id)} style={{ marginLeft: 0, textDecoration: "underline" }}  >{id}: {pageName} </label>
                        )
                    })}

                </div >}
                {!data == "" && data.pageName != "Index" && <div className='PreviewContainer' style={{}} >

                    <div style={{ display: "flex" }}>
                        <label style={{ fontSize: 25 }}>{data.pageName}</label>
                        <div onClick={toggleEditMode} style={{ display: "flex", marginLeft: "auto" }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faPenToSquare} /></div>
                        {data.id != 0 && <div onClick={CheckDeletePage} className='ToolBarItem' style={{ backgroundColor: "#e55039" }}><FontAwesomeIcon style={{ height: 15 }} icon={faTrash} /></div>}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            {deletePageCheckShow && <div onClick={DeletePage} className='ToolBarItem' style={{ backgroundColor: "#badc58" }}><FontAwesomeIcon style={{ height: 15 }} icon={faCircleCheck} /></div>}
                            {deletePageCheckShow && <div onClick={CheckDeletePage} className='ToolBarItem' style={{ backgroundColor: "#e55039" }}><FontAwesomeIcon style={{ height: 15 }} icon={faCircleXmark} /></div>}
                        </div>
                        {deletePageCheckShow && <label style={{ alignSelf: "center" }}>Are you sure you want to delete this page? </label>}
                    </div>

                    <div className='PageView' style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
                        <Preview addComponent={addComponent}>{children}</Preview>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 2, marginTop: 5 }}>
                        <label style={{ marginRight: "auto" }}>Page author: {data.pageAuthor}</label>
                        <label style={{ marginLeft: 20 }}>Page ID: {data.id}</label>
                        <label style={{ marginLeft: "auto" }}>Last changed: {data.pageLastChanged} </label>
                    </div>

                </div>}
            </div>
        </div>
    )
}
export default PageView




function ToolBar() {
    const [color, setColor] = useColor("hex", "#121212");
    const [weight, setWeight] = useState("normal");
    const [position, setPosition] = useState("left");
    const [url, setUrl] = useState("https://www.google.com");
    const [text, setText] = useState("Google");
    const [size, setSize] = useState(18);
    const [lineSize, setLineSize] = useState(100);
    const [lineThickness, setLineThickness] = useState(1);


    const [checked, setChecked] = useState("true");
    const [selected, setselected] = useState("none");
    const emojies = ["😂", "❤️", "😍", "🤣", "😊", "🙏", "💕", "😭", "😘", "👍", "😅", "👏", "😁", "🔥", "💔", "💖", "💙", "😢", "🤔", "😆", "🙄", "💪", "😉", "👌", "🤗", "💜", "😔", "😎", "😇", "🌹", "🤦", "🎉", "‼️", "💞", "✌️", "✨", "🤷", "😱", "😌", "🌸", "🙌", "😋", "💗", "💚", "😏", "💛", "🙂", "💓", "🤩", "😄", "😀", "🖤", "😃", "💯", "🙈", "👇", "🎶", "😒", "🤭", "❣️", "❗", "😜", "💋", "👀", "😪", "😑", "💥", "🙋", "😞", "😩", "😡", "🤪", "👊", "☀️", "😥", "🤤", "👉", "💃", "😳", "✋", "😚", "😝", "😴", "🌟", "😬", "🙃", "🍀", "🌷", "😻", "😓", "⭐", "✅", "🌈", "😈", "🤘", "💦", "✔️", "😣", "🏃", "💐", "☹️", "🎊", "💘", "😠", "☝️", "😕", "🌺", "🎂", "🌻", "😐", "🖕", "💝", "🙊", "😹", "🗣️", "💫", "💀", "👑", "🎵", "🤞", "😛", "🔴", "😤", "🌼", "😫", "⚽", "🤙", "☕", "🏆", "🧡", "🎁", "⚡", "🌞", "🎈", "❌", "✊", "👋", "😲", "🌿", "🤫", "👈", "😮", "🙆", "🍻", "🍃", "🐶", "💁", "😰", "🤨", "😶", "🤝", "🚶", "💰", "🍓", "💢", "🤟", "🙁", "🚨", "💨", "🤬", "✈️", "🎀", "🍺", "🤓", "😙", "💟", "🌱", "😖", "👶", "▶️", "➡️", "❓", "💎", "💸", "⬇️", "😨", "🌚", "🦋", "😷", "🕺", "⚠️", "🙅", "😟", "😵", "👎", "🤲", "🤠", "🤧", "📌", "🔵", "💅", "🧐", "🐾", "🍒", "😗", "🤑", "🚀", "🌊", "🤯", "🐷", "☎️", "💧", "😯", "💆", "👆", "🎤", "🙇", "🍑", "❄️", "🌴", "💣", "🐸", "💌", "📍", "🥀", "🤢", "👅", "💡", "💩", "⁉️", "👐", "📸", "👻", "🤐", "🤮", "🎼", "✍️", "🚩", "🍎", "🍊", "👼", "💍", "📣", "🥂", "⤵️", "📱", "☔", "🌙"]
    function SelectTool(sel) { if (sel === selected) { setselected("none") } else { setselected(sel) } }



    const pre = "<!"
    const aft = "!>"

    function ButtonOne(arg) {
        return (
            <label style={{ marginLeft: 10, borderRadius: 5, height: 20, fontSize: 14, fontWeight: "Bold" }}  > {arg.text}</label>
        )
    }
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>

                <div onClick={() => { SelectTool("text") }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faT} /></div>
                <div onClick={() => { SelectTool("linebreak") }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faArrowDown} /></div>
                <div onClick={() => { SelectTool("line") }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faGripLines} /></div>
                <div onClick={() => { SelectTool("url") }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faLink} /></div>
                <div onClick={() => { SelectTool("list") }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faList} /></div>
                <div onClick={() => { SelectTool("checkbox") }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faCheckSquare} /></div>
                <div onClick={() => { SelectTool("palett") }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faPalette} /></div>
                <div onClick={() => { SelectTool("emojies") }} className='ToolBarItem'><FontAwesomeIcon style={{ height: 15 }} icon={faPoo} /></div>
            </div >






            {selected === "line" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", width: 590, backgroundColor: "#2E2E3C", borderRadius: 5, marginTop: 5, color: "#FFFAF0", padding: 5 }}>
                <label style={{ margin: "auto", textDecoration: "underline", fontSize: 20, marginBottom: 10 }}>Line</label>

                <label style={{ display: "flex" }}>Width:
                    <input type="number" min="10" max="100" style={{ backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 10 }} onChange={e => setLineSize(e.target.value)} placeholder="100%" />
                </label>

                <label style={{ display: "flex" }}>Height:
                    <input type="number" min="1" max="100" style={{ backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 10 }} onChange={e => setLineThickness(e.target.value)} placeholder="1" />
                </label>


                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <label style={{ display: "flex" }}> {pre}line, {lineSize} , {lineThickness} , {color.hex}  {aft} </label>
                </div>
                <div style={{ display: "flex", backgroundColor: "#FFFAF0", marginBottom: 10, marginTop: 10, borderRadius: 5, padding: 15, fontSize: size }} >
                    <div style={{
                        width: lineSize + "%",
                        height: lineThickness + "px",
                        backgroundColor: color.hex,
                        borderRadius: 5,
                        marginRight: "auto",
                        marginLeft: "auto",
                        margin: 3
                    }}></div>
                </div>
                <ColorPicker width={590} height={50} color={color} onChange={setColor} hideHSV hideRGB dark />
            </div>}











            {selected === "text" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", width: 590, backgroundColor: "#2E2E3C", borderRadius: 5, marginTop: 5, color: "#FFFAF0", padding: 5 }}>
                <label style={{ margin: "auto", textDecoration: "underline", fontSize: 20, marginBottom: 10 }}>Text</label>
                <label style={{ display: "flex" }}>Font size:
                    <div onClick={() => { setSize(12) }}> <ButtonOne text={"12"}> </ButtonOne></div>
                    <div onClick={() => { setSize(14) }}> <ButtonOne text={"14"}> </ButtonOne></div>
                    <div onClick={() => { setSize(16) }}> <ButtonOne text={"16"}> </ButtonOne></div>
                    <div onClick={() => { setSize(18) }}> <ButtonOne text={"18"}> </ButtonOne></div>
                    <div onClick={() => { setSize(20) }}> <ButtonOne text={"20"} ></ButtonOne></div>
                    <div onClick={() => { setSize(22) }}> <ButtonOne text={"22"} ></ButtonOne></div>
                    <div onClick={() => { setSize(24) }}> <ButtonOne text={"24"} ></ButtonOne></div>
                    <div onClick={() => { setSize(26) }}> <ButtonOne text={"26"} ></ButtonOne></div>
                    <div onClick={() => { setSize(28) }}> <ButtonOne text={"28"} ></ButtonOne></div>
                    <div onClick={() => { setSize(30) }}> <ButtonOne text={"30"} ></ButtonOne></div>
                </label>
                <label style={{ display: "flex" }}>Position:
                    <div onClick={() => { setPosition("left") }}><ButtonOne text={"Left"} ></ButtonOne></div>
                    <div onClick={() => { setPosition("center") }}><ButtonOne text={"Center"} ></ButtonOne></div>
                    <div onClick={() => { setPosition("right") }}><ButtonOne text={"Right"} ></ButtonOne></div>
                </label>
                <label style={{ display: "flex" }}>Weight:
                    <div onClick={() => { setWeight("lighter") }}><ButtonOne text={"Lighter"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("light") }}><ButtonOne text={"Light"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("light") }}><ButtonOne text={"Normal"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("bold") }}><ButtonOne text={"Bold"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("bolder") }}><ButtonOne text={"Bolder"} ></ButtonOne></div>
                </label>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <label style={{ display: "flex" }}> {pre}text, {size} , {weight} , {color.hex} , {position} {aft} Your text! </label>
                </div>
                <div style={{ backgroundColor: "#FFFAF0", marginBottom: 10, marginTop: 10, borderRadius: 5, padding: 15, textAlign: position, fontSize: size }} >
                    <label style={{ color: color.hex, marginTop: 15, marginBottom: 15, fontWeight: weight, }}> Your text! </label>
                </div>
                <ColorPicker width={590} height={50} color={color} onChange={setColor} hideHSV hideRGB dark />
            </div>}
            {selected === "list" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", width: 590, backgroundColor: "#2E2E3C", borderRadius: 5, marginTop: 5, color: "#FFFAF0", padding: 5 }}>
                <label style={{ margin: "auto", textDecoration: "underline", fontSize: 20, marginBottom: 10 }}>List</label>
                <label style={{ display: "flex" }}>Font size:
                    <div onClick={() => { setSize(12) }}> <ButtonOne text={"12"}> </ButtonOne></div>
                    <div onClick={() => { setSize(14) }}> <ButtonOne text={"14"}> </ButtonOne></div>
                    <div onClick={() => { setSize(16) }}> <ButtonOne text={"16"}> </ButtonOne></div>
                    <div onClick={() => { setSize(18) }}> <ButtonOne text={"18"}> </ButtonOne></div>
                    <div onClick={() => { setSize(20) }}> <ButtonOne text={"20"} ></ButtonOne></div>
                    <div onClick={() => { setSize(22) }}> <ButtonOne text={"22"} ></ButtonOne></div>
                    <div onClick={() => { setSize(24) }}> <ButtonOne text={"24"} ></ButtonOne></div>
                    <div onClick={() => { setSize(26) }}> <ButtonOne text={"26"} ></ButtonOne></div>
                    <div onClick={() => { setSize(28) }}> <ButtonOne text={"28"} ></ButtonOne></div>
                    <div onClick={() => { setSize(30) }}> <ButtonOne text={"30"} ></ButtonOne></div>
                </label>
                <label style={{ display: "flex" }}>Position:
                    <div onClick={() => { setPosition("left") }}><ButtonOne text={"Left"} ></ButtonOne></div>
                    <div onClick={() => { setPosition("center") }}><ButtonOne text={"Center"} ></ButtonOne></div>
                    <div onClick={() => { setPosition("right") }}><ButtonOne text={"Right"} ></ButtonOne></div>
                </label>
                <label style={{ display: "flex" }}>Weight:
                    <div onClick={() => { setWeight("lighter") }}><ButtonOne text={"Lighter"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("light") }}><ButtonOne text={"Light"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("light") }}><ButtonOne text={"Normal"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("bold") }}><ButtonOne text={"Bold"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("bolder") }}><ButtonOne text={"Bolder"} ></ButtonOne></div>
                </label>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <label style={{ display: "flex" }}> {pre}list, {size} , {weight} , {color.hex} , {position} {aft} Your text! </label>
                </div>
                <div style={{ backgroundColor: "#FFFAF0", marginBottom: 10, marginTop: 10, borderRadius: 5, padding: 15, textAlign: position, fontSize: size }} >
                    <li style={{ color: color.hex, marginTop: 15, marginBottom: 15, fontWeight: weight, }}> Your text! </li>
                </div>
                <ColorPicker width={590} height={50} color={color} onChange={setColor} hideHSV hideRGB dark />
            </div>}
            {selected === "checkbox" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", width: 590, backgroundColor: "#2E2E3C", borderRadius: 5, marginTop: 5, color: "#FFFAF0", padding: 5 }}>
                <label style={{ margin: "auto", textDecoration: "underline", fontSize: 20, marginBottom: 10 }}>Checkbox</label>
                <label style={{ display: "flex" }}>Font size:
                    <div onClick={() => { setSize(12) }}> <ButtonOne text={"12"}> </ButtonOne></div>
                    <div onClick={() => { setSize(14) }}> <ButtonOne text={"14"}> </ButtonOne></div>
                    <div onClick={() => { setSize(16) }}> <ButtonOne text={"16"}> </ButtonOne></div>
                    <div onClick={() => { setSize(18) }}> <ButtonOne text={"18"}> </ButtonOne></div>
                    <div onClick={() => { setSize(20) }}> <ButtonOne text={"20"} ></ButtonOne></div>
                    <div onClick={() => { setSize(22) }}> <ButtonOne text={"22"} ></ButtonOne></div>
                    <div onClick={() => { setSize(24) }}> <ButtonOne text={"24"} ></ButtonOne></div>
                    <div onClick={() => { setSize(26) }}> <ButtonOne text={"26"} ></ButtonOne></div>
                    <div onClick={() => { setSize(28) }}> <ButtonOne text={"28"} ></ButtonOne></div>
                    <div onClick={() => { setSize(30) }}> <ButtonOne text={"30"} ></ButtonOne></div>
                </label>
                <label style={{ display: "flex" }}>Position:
                    <div onClick={() => { setPosition("left") }}><ButtonOne text={"Left"} ></ButtonOne></div>
                    <div onClick={() => { setPosition("center") }}><ButtonOne text={"Center"} ></ButtonOne></div>
                    <div onClick={() => { setPosition("right") }}><ButtonOne text={"Right"} ></ButtonOne></div>
                </label>
                <label style={{ display: "flex" }}>Weight:
                    <div onClick={() => { setWeight("lighter") }}><ButtonOne text={"Lighter"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("light") }}><ButtonOne text={"Light"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("light") }}><ButtonOne text={"Normal"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("bold") }}><ButtonOne text={"Bold"} ></ButtonOne></div>
                    <div onClick={() => { setWeight("bolder") }}><ButtonOne text={"Bolder"} ></ButtonOne></div>
                </label>
                <label style={{ display: "flex" }}>Checked:
                    <div onClick={() => { setChecked(true) }}><ButtonOne text={"Checked"} ></ButtonOne></div>
                    <div onClick={() => { setChecked(false) }}><ButtonOne text={"UnChecked"} ></ButtonOne></div>
                </label>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <label style={{ display: "flex" }}> {pre}checkbox, {size} , {weight} , {color.hex} , {position} , {checked + ""} {aft} Your text! </label>
                </div>
                <div style={{ backgroundColor: "#FFFAF0", marginBottom: 10, marginTop: 10, borderRadius: 5, padding: 15, textAlign: position, fontSize: size }} >
                    <input type="checkbox" checked={checked} ></input>
                    <label style={{ color: color.hex, marginTop: 15, marginBottom: 15, fontWeight: weight, }}> Your text! </label>

                </div>
                <ColorPicker width={590} height={50} color={color} onChange={setColor} hideHSV hideRGB dark />
            </div>}
            {selected === "url" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", width: 590, backgroundColor: "#2E2E3C", borderRadius: 5, marginTop: 5, color: "#FFFAF0", padding: 5 }}>
                <label style={{ margin: "auto", textDecoration: "underline", fontSize: 20, marginBottom: 10 }}>URL</label>
                <label style={{ display: "flex" }}>Font size:
                    <div onClick={() => { setSize(12) }}> <ButtonOne text={"12"}> </ButtonOne></div>
                    <div onClick={() => { setSize(14) }}> <ButtonOne text={"14"}> </ButtonOne></div>
                    <div onClick={() => { setSize(16) }}> <ButtonOne text={"16"}> </ButtonOne></div>
                    <div onClick={() => { setSize(18) }}> <ButtonOne text={"18"}> </ButtonOne></div>
                    <div onClick={() => { setSize(20) }}> <ButtonOne text={"20"} ></ButtonOne></div>
                    <div onClick={() => { setSize(22) }}> <ButtonOne text={"22"} ></ButtonOne></div>
                    <div onClick={() => { setSize(24) }}> <ButtonOne text={"24"} ></ButtonOne></div>
                    <div onClick={() => { setSize(26) }}> <ButtonOne text={"26"} ></ButtonOne></div>
                    <div onClick={() => { setSize(28) }}> <ButtonOne text={"28"} ></ButtonOne></div>
                    <div onClick={() => { setSize(30) }}> <ButtonOne text={"30"} ></ButtonOne></div>
                </label>
                <label style={{ display: "flex" }}>Position:
                    <div onClick={() => { setPosition("left") }}><ButtonOne text={"Left"} ></ButtonOne></div>
                    <div onClick={() => { setPosition("center") }}><ButtonOne text={"Center"} ></ButtonOne></div>
                    <div onClick={() => { setPosition("right") }}><ButtonOne text={"Right"} ></ButtonOne></div>
                </label>

                <label style={{ display: "flex" }}>Url:
                    <input style={{ backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 10 }} type="text" onChange={e => setUrl(e.target.value)} placeholder="https://www.google.com" />
                </label>

                <label style={{ display: "flex" }}>Text:
                    <input style={{ backgroundColor: "transparent", border: 0, color: "#FFFAF0", marginLeft: 3 }} type="text" onChange={e => setText(e.target.value)} placeholder="Google" />
                </label>

                <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <label style={{ display: "flex" }}> {pre}url, {size} , {text} , {url}  {aft} </label>
                </div>
                <div style={{ backgroundColor: "#FFFAF0", marginBottom: 10, marginTop: 10, borderRadius: 5, padding: 15, textAlign: position, fontSize: size }} >
                    <label style={{ color: color.hex, marginTop: 15, marginBottom: 15, fontWeight: weight, }}>  </label>
                    <a style={{ fontSize: size + "px" }} href={url} target="_blank" rel="noreferrer"> {text} </a>

                </div>
                <ColorPicker width={590} height={50} color={color} onChange={setColor} hideHSV hideRGB dark />
            </div>}

            {selected === "palett" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", width: 590, backgroundColor: "#2E2E3C", borderRadius: 5, marginTop: 5, color: "#FFFAF0", padding: 5 }}>
                <label style={{ margin: "auto", textDecoration: "underline", fontSize: 20 }}>Color Palett</label>
                <ColorPicker width={590} height={100} color={color} onChange={setColor} hideHSV hideRGB dark />
            </div>}
            {selected === "emojies" && <div style={{ display: "flex", flexDirection: "column", justifyContent: "left", width: 590, backgroundColor: "#2E2E3C", borderRadius: 5, marginTop: 5, color: "#FFFAF0", padding: 5 }}>
                <label style={{ margin: "auto", textDecoration: "underline", fontSize: 20 }}>Emojies</label>
                <label style={{ margin: "auto", fontSize: 16 }}>Click to copy!</label>
                <div style={{ display: "flex", flexWrap: "wrap", textAlign: "center" }}>
                    {emojies.map(({ pageName, id }, index) => {
                        return (<label style={{ width: 20 }} onClick={() => { navigator.clipboard.writeText(emojies[index]) }}>{emojies[index]}</label>)
                    })}
                </div>
            </div>}


        </div >
    )
}




///////Child Creator component
const Preview = ({ children, addComponent }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
    )
}

const ChildComponent = ({ TYPE, CONTENT, COLOR, SIZE, WEIGHT, JUSTIFY, ARG6 }) => {

    let type = TYPE.toLowerCase();
    let justify = ""
    if (JUSTIFY === null) { }
    else {
        try {
            justify = JUSTIFY.toLowerCase();
        }
        catch { }
    }
    if (justify === "left" | justify === "right" | justify === "center") { }
    else { justify = "left" }


    if (type === "label" | type === "text") {
        SIZE = SIZE + "px"
        return (

            <div style={{ textAlign: justify }}>
                <label id="previevContainer" style={{ color: COLOR, fontSize: SIZE, fontWeight: WEIGHT }}>{CONTENT}  </label>
            </div>
        )
    }
    if (type === "list") {
        SIZE = SIZE + "px"
        return (

            <div style={{ textAlign: justify }}>
                <li id="previevContainer" style={{ color: COLOR, fontSize: SIZE, fontWeight: WEIGHT }}>{CONTENT}  </li>
            </div>
        )
    }
    if (type === "checkbox" | type === "check") {
        SIZE = SIZE + "px"
        if (ARG6 == "true") { ARG6 = true }
        if (ARG6 == "false") { ARG6 = false }
        if (ARG6 === undefined) { ARG6 = false }
        return (
            <div style={{ textAlign: justify }}>
                <input type="checkbox" id="previevContainer" checked={ARG6} ></input>
                <label id="previevContainer" style={{ color: COLOR, fontSize: SIZE, fontWeight: WEIGHT }}>{CONTENT}</label>
            </div>
        )
    }
    if (type === "break") {

        return (
            <br></br>
        )
    }
    if (type === "line") {
        if (SIZE === undefined) { SIZE = "100%" }
        if (SIZE === "") { SIZE = "100%" }
        if (SIZE >= 100) { SIZE = "100%" }
        if (isNaN(SIZE)) { SIZE = 100 }
        SIZE = SIZE + "%"
        if (WEIGHT === undefined) { WEIGHT = 1 }
        if (WEIGHT >= 100) { WEIGHT = "100px" }
        if (WEIGHT <= 1) { WEIGHT = "1px" }
        else { WEIGHT = WEIGHT + "px" }
        if (COLOR === undefined) { COLOR = "#171725" }
        return (
            <div style={{
                width: SIZE,
                height: WEIGHT,
                backgroundColor: COLOR,
                borderRadius: 5,
                alignSelf: "center",
                margin: 3
            }}></div>
        )
    }
    if (type === "url") {


        return (
            <a style={{ fontSize: SIZE + "px" }} href={COLOR} target="_blank" rel="noreferrer"> {WEIGHT} </a>

        )
    }
    else {
        return (
            <div>
                <label id="previevContainer" style={{}}>Syntax Error: {CONTENT}</label>
            </div>
        )
    }

} 