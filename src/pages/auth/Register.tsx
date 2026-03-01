import RegisterForm from "../../components/RegisterForm";

const Register = () => {
  return (
    <div className="w-1/2 card-bg flex flex-col gap-10 justify-center items-center m-auto mt-28 p-14 rounded-xl">
      <div className="black-han text-3xl">회원가입</div>
      <RegisterForm />
    </div>
  )
}

export default Register;