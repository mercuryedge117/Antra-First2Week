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
        container: ".courses_container",
        avaliableCourse: ".avaliable_course",
        selectedCourse: ".selected_course",
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
    // const demo = [
    //     {
    //         "courseId": 1,
    //         "courseName": "Calculus",
    //         "required": true,
    //         "credit": 3
    //       },
    //       {
    //         "courseId": 2,
    //         "courseName": "Data Structures",
    //         "required": true,
    //         "credit": 3
    //       },
    //       {
    //         "courseId": 4,
    //         "courseName": "Cyber Security",
    //         "required": false,
    //         "credit": 3
    //       },
    // ];
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
            const courseContainer = document.querySelector(domStr.avaliableCourse);
            const tmp = creatTmp(this._courseList);
            render(courseContainer, tmp);
        }

        get selectedCourseList() {
            return this._selectedCourseList;
        }        
        set selectedCourseList(arr) {
            this._selectedCourseList = arr;
        }

        get tCredit() {
            return this._totalCredit;
        }
        set newtCredit(num) {
            this._totalCredit = num;
            const container = document.querySelector(domStr.counter);
            const tmp = `${this._totalCredit}`;
            render(container, tmp);
        }

        addCourses() {
            const selectedContainer = document.querySelector(domStr.selectedCourse);
            const tmp = creatTmp(this._selectedCourseList);
            render(selectedContainer, tmp);
        }
    }

    return {
        // demo,
        getData,
        State,
    };
})(View, Api);

const Controller = ((view, model) => {
    // const { demo,  State } = model;
    const { getData, State } = model;
    const { domStr } = view;

    const state = new State();
    const init = () => {
        getData.then((data) => {
            state.newCourseList = data;
            onClickCourses();
        });
        // state.newCourseList = demo;
    };

    const onClickCourses = () => {
        const courses = document.querySelectorAll(domStr.courseTag);
        courses.forEach((course) => {
            course.addEventListener('click', (event) => {
                const id = event.target.parentElement.dataset.id;
                if (id !== undefined) {
                    const courseList = state.courseList;
                    let idList = state.selectedIdList;
                    let selected = state.selectedCourseList;
                    let totalCount = state.tCredit;

                    const currCourse = courseList.find((course) => {
                        const {courseId} = course; 
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

                    selected = courseList.filter((course) => {
                        const {courseId} = course; 
                        return idList.includes(courseId.toString());
                    });

                    state.selectedCourseList = selected;
                    state.selectedIdList = idList;
                    state.newtCredit = totalCount;
                }
            })
        })
    }

    const addCourseButton = () => {
        const btn = document.querySelector(domStr.addBtn);
        btn.addEventListener("click", () => {
            // TODO: ALERT
            if (window.confirm("You have chosen " + state.tCredit + " credits for this semester. You cannot change once you submit. Do you want to confirm?")) {
                state.addCourses();
                let courseList = state.courseList;
                courseList = courseList.filter((course) => {
                    const {courseId} = course; 
                    return !state.selectedIdList.includes(courseId.toString());
                })
                state.newCourseList = courseList;
                onClickCourses();
            }
        });
    };

    const bootstrap = () => {
        init();
        addCourseButton();
    }

    return {
        bootstrap
    }
})(View, Model);

Controller.bootstrap();