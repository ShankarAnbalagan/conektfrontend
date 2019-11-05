import React from 'react';

const Miniform = props =>(
    <form onSubmit={props.gettext}>
    <textarea name ="post" placeholder="write here"/>
    
    <button type="submit">Search</button>
</form>
);

export default Miniform;