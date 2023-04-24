import "./EmptyView.css";
interface EmptyViewProps {
    msg: string;
}
function EmptyView(props: EmptyViewProps): JSX.Element {
    return (
        <div className="EmptyView flex-center-col">
            <h2>{props.msg}</h2>
            <img src="https://imgur.com/a/0vqkXpp" alt={"empty image"} width="30%"  />
        
        </div>
    );
}

export default EmptyView;
