    var KanbanTest = new jKanban({
            element: "#myKanban",
            gutter: "10px",
            widthBoard: "450px",
        itemHandleOptions:{
            enabled: true,
        },
        click: function(el) {
            console.log("Trigger on all items click!");
        },
        context: function(el, e) {
            console.log("Trigger on all items right-click!");
        },
        dropEl: function(el, target, source, sibling){
            console.log(target.parentElement.getAttribute('data-id'));
            console.log(el, target, source, sibling)
        },
        buttonClick: function(el, boardId) {
            console.log(el);
            console.log(boardId);
            // create a form to enter element
            var formItem = document.createElement("form");
            formItem.setAttribute("class", "itemform");
            formItem.innerHTML ='<div class="form-group"><textarea class="form-control" rows="2" autofocus></textarea></div><div class="form-group"><button type="submit" class="btn btn-primary btn-xs pull-right">Submit</button><button type="button" id="CancelBtn" class="btn btn-outline-warning btn-xs pull-right">Cancel</button></div>';

            KanbanTest.addForm(boardId, formItem);
            formItem.addEventListener("submit", function(e) {
                e.preventDefault();
                var text = e.target[0].value;
                KanbanTest.addElement(boardId, {
                    title: text
                });
                formItem.parentNode.removeChild(formItem);
            });
            document.getElementById("CancelBtn").onclick = function() {
                formItem.parentNode.removeChild(formItem);
            };
        },
        itemAddOptions: {
            enabled: true,
            content: '+ Add New Card',
            class: 'btn btn-primary m-0 px-3 py-2 rounded-2',
            footer: true
        },
        boards: [
        {
            id: "_todo",
            title: "To Do List (24)",
            class: "card-header, card--task-header, bg-primary, text-white, ff-heading, fs-20, px-5, py-4, mb-3, border-0",
            dragTo: ["_working"],
            item: [
                
            {
                id: "_test_delete",
                title: "Visual Graphic for Presentation to Client",
            },
            {
                title: "Create wireframe for landing page",
            },
            {
                title: "Setup database for create API connection",
            }
            ]
        },
        {
            id: "_working",
            title: "Working (Try drag me too)",
            class: "card-header, card--task-header, bg-warning, text-white, ff-heading, fs-20, px-5, py-4, mb-3, border-0",
            item: [
            {
                title: "Setup database for create API connection"
            },
            {
                title: "Create wireframe for landing page"
            },
            {
                title: "Create base html project landing page"
            }
            ]
        },
        {
            id: "_done",
            title: "Done (Can drop item only in working)",
            class: "card-header, card--task-header, bg-success, text-white, ff-heading, fs-20, px-5, py-4, mb-3, border-0",
            dragTo: ["_working"],
            item: [
            {
                title: "Button contact not working when clikced"
            },
            {
                title: "Create base html project landing page"
            }
            ]
        }
        ]
    });

    var toDoButton = document.getElementById("addToDo");
    toDoButton.addEventListener("click", function() {
        KanbanTest.addElement("_todo", {
        title: "Test Add"
        });
    });

    var toDoButtonAtPosition = document.getElementById("addToDoAtPosition");
    toDoButtonAtPosition.addEventListener("click", function() {
        KanbanTest.addElement("_todo", {
        title: "Test Add at Pos"
        }, 1);
    });

    var addBoardDefault = document.getElementById("addDefault");
    addBoardDefault.addEventListener("click", function() {
        KanbanTest.addBoards([
        {
            id: "_default",
            title: "Kanban Default",
            item: [
            {
                title: "Default Item"
            },
            {
                title: "Default Item 2"
            },
            {
                title: "Default Item 3"
            }
            ]
        }
        ]);
    });

    var removeBoard = document.getElementById("removeBoard");
    removeBoard.addEventListener("click", function() {
        KanbanTest.removeBoard("_done");
    });

    var removeElement = document.getElementById("removeElement");
    removeElement.addEventListener("click", function() {
        KanbanTest.removeElement("_test_delete");
    });

    var allEle = KanbanTest.getBoardElements("_todo");
    allEle.forEach(function(item, index) {
        //console.log(item);
    });
