const list = document.querySelector(".list");
const btnAdd = document.querySelector(".btn_add");
const text = document.querySelector(".text");
const tab = document.querySelector(".tab");
const unfinished = document.querySelector(".unfinished");
const finished = document.querySelector(".finished");

let data = [];

//顯示內容
function render(data){
    let str = "";
    data.forEach((item,index) => {
        str += 
        `<li data-id="${item.id}">
        <label class="checkbox" for="">
          <input type="checkbox" ${item.checked}/>
          <span>${item.content}</span>
        </label>
        <a href="#" class="delete" data.num="${index}"></a>
      </li>`
    })
    list.innerHTML = str;
}

//新增
btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    if (text.value ===""){
        alert("請輸入內容");
        return;
    }
    let item = {};
    item.content = text.value;
    item.id = new Date().getTime();
    item.checked = "";
    data.unshift(item);
    update();
    text.value = "";
})

//刪除
list.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.getAttribute("class") !=="delete"){
        return;
    }
    let delnum = e.target.getAttribute("data-num")
    data.splice(delnum,1);
    update();
})

//切換狀態
list.addEventListener("click", (e) => {
    let id = parseInt(e.target.closest("li").dataset.id);
    data.forEach((item) => {
    if (item.id === id) {
        if (item.checked === "checked"){
            item.checked = "";
        }else {
            item.checked = "checked";
        }
    }  
})
update();
})

//切換tab
let toggleStatus = "all";
tab.addEventListener("click", (e) => {
    let tabs = document.querySelectorAll(".tab li");
    tabs.forEach((a) => {
        a.classList.remove("active");
    });
        e.target.classList.add("active");
        toggleStatus = e.target.closest('li').getAttribute("data-tab");
    update();
})

// 更新狀態
function update() {
    let newData = [];
    if( toggleStatus === "all" ){
        newData = data;
    } else if ( toggleStatus === "unfinished" ){
        newData = data.filter((item) => item.checked === "");
    } else {
        newData = data.filter((item) => item.checked === "checked");
    }

    const unfinishedNum = document.querySelector(".unfinishedNum");
    let dataLength = data.filter((item) => item.checked === "");
    unfinishedNum.textContent = dataLength.length;
    
    render(newData);
}
update();

// 清除已完成項目
const delFinished = document.querySelector(".del_finished");
    delFinished.addEventListener("click", (e) => {
    e.preventDefault();
    data = data.filter((item) => item.checked !== "checked");
    update();
})

