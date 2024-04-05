const Api = (() => {
    // Fetch data from server
    const url = "http://localhost:4232/courseList";
    const getData = fetch(url).then((res) => res.json());
    return {
        getData,
    };
})();

const View = (() => {
    const domStr = {
        avaliableCContainer: ".avaliable_course",
        selectedCContainer: ".selected_course",
        courseTag: ".course",
        counter: ".credit_counter",
        addBtn: ".add_course",
    };

    const creatTmp = (arr) => {
        let tmp = "";
        arr.forEach((course) => {
            tmp += `<li class="course" data-id="${course.courseId}">
            <div>${course.courseName}</div>
            <div>Course Type: ${course.required ? "Compulsory" : "Elective"}</div>
            <div>Course Credit: ${course.credit}</div>
        </li>`;
        });
        return tmp;
    };

    const render = (ele, tmp) => {
        ele.innerHTML = tmp;
    };

    return {
        domStr,
        creatTmp,
        render,
    };
})();

const Model = ((view, api) => {
    const { getData } = api;
    const { domStr, creatTmp, render } = view;

    class State {
        constructor() {
            this._courseList = [];

            this._selectedIdList = [];
            this._selectedCourseList = [];
            this._totalCredit = 0;
        }

        get selectedIdList() {
            return this._selectedIdList;
        }
        set selectedIdList(arr) {
            this._selectedIdList = arr;
        }

        get courseList() {
            return this._courseList;
        }
        set newCourseList(arr) {
            this._courseList = arr;
            const courseContainer = document.querySelector(domStr.avaliableCContainer);
            const tmp = creatTmp(this._courseList);
            render(courseContainer, tmp);
        }

        get selectedCourseList() {
            return this._selectedCourseList;
        }
        set selectedCourseList(arr) {
            this._selectedCourseList = arr;
        }

        get totalCredit() {
            return this._totalCredit;
        }
        set newTotalCredit(num) {
            this._totalCredit = num;
            const container = document.querySelector(domStr.counter);
            const tmp = `${this._totalCredit}`;
            render(container, tmp);
        }

        addCourses() {
            const selectedContainer = document.querySelector(domStr.selectedCContainer);
            const tmp = creatTmp(this._selectedCourseList);
            render(selectedContainer, tmp);
        }
    }

    return {
        getData,
        State,
    };
})(View, Api);

const Controller = ((view, model) => {
    const { getData, State } = model;
    const { domStr } = view;

    const state = new State();
    const init = () => {
        getData.then((data) => {
            state.newCourseList = data;
            onClickCourse();
        });
    };

    const onClickCourse = () => {
        const courseUnits = document.querySelectorAll(domStr.courseTag);
        courseUnits.forEach((course) => {
            course.addEventListener('click', (event) => {
                const id = event.target.parentElement.dataset.id;
                if (id !== undefined) {
                    const courseList = state.courseList;
                    let idList = state.selectedIdList;
                    let selected = state.selectedCourseList;
                    let totalCount = state.totalCredit;

                    const currCourse = courseList.find((ele) => {
                        const { courseId } = ele;
                        return id === courseId.toString();
                    });

                    const flag = idList.includes(id);

                    // ADD
                    if (!flag) {
                        if (currCourse.credit > 18 - totalCount) {
                            console.log("exceed");
                            window.alert("You can only choose up to 18 credits in one semester");
                        }
                        else {
                            idList.push(id);
                            totalCount += currCourse.credit;
                            course.classList.toggle('highlight');
                        }
                    }
                    // REMOVE
                    else {
                        idList = idList.filter((ele) => (ele !== id));
                        totalCount -= currCourse.credit;
                        course.classList.toggle('highlight');
                    }

                    selected = courseList.filter((ele) => {
                        const { courseId } = ele;
                        return idList.includes(courseId.toString());
                    });

                    state.selectedCourseList = selected;
                    state.selectedIdList = idList;
                    state.newTotalCredit = totalCount;
                }
            })
        })
    }

    const addCourseBtn = () => {
        const btn = document.querySelector(domStr.addBtn);
        btn.addEventListener("click", () => {
            if (window.confirm("You have chosen " + state.totalCredit + " credits for this semester. You cannot change once you submit. Do you want to confirm?")) {
                state.addCourses();
                let courseList = state.courseList;
                courseList = courseList.filter((course) => {
                    const { courseId } = course;
                    return !state.selectedIdList.includes(courseId.toString());
                })
                state.newCourseList = courseList;
                onClickCourse();
                btn.disabled = true;
            }
        });
    };

    const bootstrap = () => {
        init();
        addCourseBtn();
    }

    return {
        bootstrap
    }
})(View, Model);

Controller.bootstrap();