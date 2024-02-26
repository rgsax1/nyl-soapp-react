const LoginComponent = () => {
    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card login-card">
                            <div className="card-body">
                                <h3 className="text-center mb-4"><i className="fas fa-user"></i> Login</h3>
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="text" className="form-label">Usuário</label>
                                        <input type="text" className="form-control" id="user"
                                               placeholder="Seu usuário"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Senha</label>
                                        <input type="password" className="form-control" id="password"
                                               placeholder="Sua senha"/>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" id="remember"></input>
                                        <label className="form-check-label" htmlFor="remember">Lembrar-me</label>
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;