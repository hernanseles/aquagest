import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import '@fontsource/manrope/800.css';
import App from './App.jsx';
import './styles.css';
class ErrorBoundary extends React.Component { state={error:false}; static getDerivedStateFromError(){return {error:true};} render(){return this.state.error?<main className="fatal"><h1>Vamos tentar novamente?</h1><p>Não foi possível abrir esta tela. Seus dados locais não foram apagados.</p><button onClick={()=>location.reload()}>Recarregar página</button></main>:this.props.children;} }
createRoot(document.getElementById('root')).render(<React.StrictMode><ErrorBoundary><App/></ErrorBoundary></React.StrictMode>);
