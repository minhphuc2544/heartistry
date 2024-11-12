import DeploymentModel from "./assets/svg/deployment_model.svg"

export default function App() {
  return (
    <div style={{width: `${window.innerWidth}px`, height: `${window.innerHeight}px`}}>
      <img alt="Deployment Model" width={1438} height={542} src={DeploymentModel} style={{position: "relative", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} />
    </div>
  )
}