import { localModelData } from "./my_model.mjs";

let model1 = new localModelData("history_calc_db");

let btn = document.getElementById("btn_history");
let btn_equal = document.getElementById("btn_equal");
let btn_collection_sign = document.querySelectorAll(".container .calculator .body-calc .buttons .sign");
let label_calc = document.getElementById("label_calc");
let label_calc_res = document.getElementById("label_calc_res");
let btn_operation = document.querySelectorAll(".container .calculator .body-calc .buttons .btn_operations");
let btn_ce = document.getElementById("btn_ce");
let btn_c = document.getElementById("btn_c");
let list_history = document.getElementById("list_history");
let btn_del_history = document.getElementById("btn_del_history");

let validator = true;
let validateOperation = true;

function dropLastChar(str)
{
    return str.substring(0, str.length - 1);
}

function createItemModel(str_res, str)
{
    let item = {};
    item[str_res] = str;
    return item;
}

function refreshData()
{
    list_history.querySelectorAll('*').forEach(n => n.remove());

    model1.getItems().forEach(element => 
        {
            const node = document.createElement("li");
            const p = document.createElement("p");
            const h4 = document.createElement("h4");

            const textNodeP = document.createTextNode(`${Object.keys(element)[0]}`);
            const textNodeH4 = document.createTextNode(`${Object.values(element)[0]}`);

            p.appendChild(textNodeP);
            h4.appendChild(textNodeH4);

            node.appendChild(p);
            node.appendChild(h4);

            list_history.appendChild(node);
        });
}

btn.addEventListener("click", function(e)
{
    let hist = document.getElementById("history");
    if(validator)
    {
        hist.style.display = "none"
    }
    else
    {
        hist.style.display = "block";
    }
    
    validator = !validator;
});


btn_equal.addEventListener("click", function(e) 
{
    let str = label_calc_res.textContent + label_calc.textContent;
    if(label_calc.textContent != "")
    {
        label_calc.textContent = eval(label_calc_res.textContent + label_calc.textContent);
    }
    else
    {
        label_calc.textContent = dropLastChar(label_calc_res.textContent);
    }

    model1.addItem(createItemModel(str, label_calc.textContent));
    label_calc_res.textContent = "";

    refreshData();
});

btn_collection_sign.forEach(element =>
{
    element.addEventListener("click", function(e)
    {
        label_calc.textContent += element.textContent;
        validateOperation = true;
    });
});

btn_operation.forEach(element =>
{
    element.addEventListener("click", function(e)
    {
        if(validateOperation && label_calc.textContent != "")
        {
            label_calc_res.textContent += label_calc.textContent + element.textContent;
            label_calc.textContent = "";
            label_calc_res.textContent = eval(dropLastChar(label_calc_res.textContent)) + element.textContent;
            validateOperation = false;
        }
    });
});

btn_ce.addEventListener("click", function(e)
{
    label_calc.textContent = "";
    label_calc_res.textContent = "";
});

btn_c.addEventListener("click", function(e)
{
    label_calc.textContent = dropLastChar(label_calc.textContent);
});

btn_del_history.addEventListener("click", function()
{
    list_history.querySelectorAll('*').forEach(n => n.remove());
    model1.deleteItems();
});