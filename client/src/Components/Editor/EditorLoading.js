import Splitter, { SplitDirection } from '@devbookhq/splitter';
import Loading from "./Loading";

function EditorLoading() {
  return (
    <div className="editor-container">
			<div className="home-nav">
	      		<Loading />
      </div>

			<div className="split-container">
				 <Splitter 
				 	direction={SplitDirection.Horizontal} 
				 	initialSizes={[20, 58, 22]}
				 	minWidths={[20, 20, 20]}
				 >
					<Loading />
					<Splitter
						direction={SplitDirection.Vertical} 
						initialSizes={[65, 35]}
					>
						<div className="box-content">
							<Loading />
						</div>
						<div className="terminal-wrapper" >
							<Loading />
						</div>
					</Splitter>
					<div className="chatbox">
						<Loading />
					</div>
				</Splitter>
			</div>
		</div>
  )
}

export default EditorLoading;
