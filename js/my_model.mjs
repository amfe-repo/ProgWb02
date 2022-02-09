export class localModelData
{
    constructor(keyName)
    {
        this.dataModel = [];
        this.keyName = keyName;
        localStorage.setItem(this.keyName, JSON.stringify(this.dataModel));
    }

    addItem = (obj) =>
    {
        this.dataModel.push(obj);
        localStorage.setItem(this.keyName, JSON.stringify(this.dataModel));
    }

    getItems = ()=>
    {
        return JSON.parse(localStorage.getItem(this.keyName));
    }

    deleteItems = ()=>
    {
        localStorage.clear();
        this.dataModel = [];
    }

}

