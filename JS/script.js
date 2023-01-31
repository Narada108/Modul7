{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => {
            if (taskIndex !== index) {
                return task;
            }
            return {
                ...task,
                done: !task.done,
            }
        })
        render();
    };

    const toggleHideTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    }


    const doneAllTasks = () => {
        tasks = tasks.map((task) => (
            { ...task, done: true }
        ));
        render();
    }

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li 
                    class="tasks__item ${hideDoneTasks === true && task.done ? "tasks__item--hidden" : ""}  js-tasks"
                >
                    <button class="tasks__button tasks__button--toggleDone js-toggleDone">
                        ${task.done ? "✔" : ""}
                    </button>

                    <span class="tasks__content${task.done ? " tasks__content--done" : ""}">
                        ${task.content}
                    </span>

                    <button class="tasks__button tasks__button--remove js-remove">
                        🗑
                    </button>
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let buttons = document.querySelector(".section__buttons");

        if (tasks.length === 0) {
            buttons.innerHTML = ` `;

        } else {
            htmlButtons = `
                <button class="section__buttonElement section__hideDoneTask">
                    ${hideDoneTasks === false ? "Ukryj ukończone" : "Pokaż ukończone"}
                </button>

                <button class="section__buttonElement section__makeAllDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                    Ukończ wszystkie
                </button>
            `;

            buttons.innerHTML = htmlButtons;
        };
    };

    const bindButtonsEvents = () => {
        if (tasks.length > 0) {
            const hideDoneButton = document.querySelector(".section__hideDoneTask");
            hideDoneButton.addEventListener("click", toggleHideTasks)

            const allDoneButton = document.querySelector(".section__makeAllDone");
            allDoneButton.addEventListener("click", doneAllTasks);
        };
    };

    const render = () => {
        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();


        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
};