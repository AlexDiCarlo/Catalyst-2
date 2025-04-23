function Spacer(props:any){
    let content = props.content.data;
    return (
        <div id={content.contentguid}>
            <div className={`flex ${content.margin_top_bottom_mobile} ${content.margin_top_bottom_desktop}`}></div>
        </div>
    )
}

export default Spacer;