import React from 'react'

function NoteItem(props) {
    const { notes } = props;
    return (
        <div class="col-md-3 my-2">
            <div class="card">
                <div class="card-body my-2">
                    <h5 class="card-title">{notes.title}</h5>
                    <p class="card-text">{notes.description} Lorem 
                    ipsum dolor sit amet consectetur adipisicing elit. 
                    Necessitatibus amet neque enim quae autem dolorum
                     suscipit sint ut quaerat laboriosam. Quas tempo
                    </p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem