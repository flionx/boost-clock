function CreateTaskCard() {
    return (
        <li class="tasks__item">

            <section class="tasks__task-create task">
                
                <div class="create-task__col">
                    <h4 class="task__title create-task__title">Title</h4>
                    <input class="create-task__input" type="text" placeholder="title for your task" />
                </div>
                <div class="create-task__col">
                    {/* <h4 class="task__title create-task__title">Description</h4> */}
                    <button class="btn-with-plus pink-btn m15">Add description (optional)</button>
                    {/* <textarea class="create-task__input" placeholder="more detailed task description" /> */}
                </div>
                <div class="create-task__bottom">
                    <button class="btn-with-plus pink-btn">Add the desired deadline (optional)</button>
                    <div className="create-task__btns">
                        <button class="create-task__btn-cancel">Cancel</button>
                        <button class="create-task__btn-create pink-btn">Create</button>
                    </div>
                </div>
            </section>
        </li>
    )
}

export default CreateTaskCard;