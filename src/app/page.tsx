import { Button } from "@/components/ui/button"
import Toggler from "@/components/ui/toggler"
import Signin from "@/components/signinoutbtn"
import Signupform from "@/components/Signupform"
export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
      <Toggler/>
      <Signin/>
      <Signupform/>
    </div>
  )
}
