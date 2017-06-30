import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import store from './store';
import { LocaleProvider  } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';

import App from './components/App';
import Home from './components/Home';

import HomeLaiXe from './components/laixe/Home';
import DoMenuLaiXe from './components/laixe/DoMenu';
import PhuPhiMenuLaiXe from './components/laixe/PhuPhiMenu';
import EditPhuPhiLaiXe from './components/laixe/EditPhuPhi';
import LaiXeThemDO from './components/laixe/DO';
import LaiXeListDO from './components/laixe/ListDO';
import LaiXeEditDO from './components/laixe/EditDO';
import LaiXePassword from './components/laixe/Password';

import LaiXeThemPhuPhi from './components/laixe/PhuPhi';
import LaiXeListPhuPhi from './components/laixe/ListPhuPhi';
import LaiXeEditPhuPhi from './components/laixe/EditPhuPhi';

import ThemLaiXe from './components/it/LaiXe';
import ThemXe from './components/it/Xe';
import ThemThauPhu from './components/it/ThauPhu';
import ThemDieuHanh from './components/it/DieuHanh';
import HomeIT from './components/it/Home';
import ThemAutoFill from './components/it/AutoFill';


import HomeDieuHanh from './components/dieuhanh/Home';
import DieuHanhDO from './components/dieuhanh/ListDO';
import DieuHanhPhuPhi from './components/dieuhanh/ListPhuPhi';
import DieuHanhEditDO from './components/dieuhanh/EditDO';
import DieuHanhEditPhuPhi from './components/dieuhanh/EditPhuPhi';

import HomeThauPhu from './components/thauphu/Home';
import ThauPhuDanhSachLaiXe from './components/thauphu/ListLaiXe';
import ThauPhuThemLaiXe from './components/thauphu/LaiXe';

ReactDOM.render((
  <LocaleProvider locale={enUS}>
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          
          <Route path="laixe" component={HomeLaiXe} />
          <Route path="laixe/do" component={DoMenuLaiXe} />
          <Route path="laixe/phuphi" component={PhuPhiMenuLaiXe} />
          <Route path="laixe/phuphi/:id" component={EditPhuPhiLaiXe} />

          <Route path="laixe/themdo" component={LaiXeThemDO} />
          <Route path="laixe/danhsachdo" component={LaiXeListDO} />
          <Route path="laixe/doimatkhau" component={LaiXePassword} />
          <Route path="laixe/do/:id" component={LaiXeEditDO} />


          <Route path="laixe/themphuphi" component={LaiXeThemPhuPhi} />
          <Route path="laixe/danhsachphuphi" component={LaiXeListPhuPhi} />
          <Route path="laixe/phuphi/:id" component={LaiXeEditPhuPhi} />
          
          <Route path="it" component={HomeIT} />
          <Route path="it/thauphu" component={ThemThauPhu} />
          <Route path="it/laixe" component={ThemLaiXe} />
          <Route path="it/xe" component={ThemXe} />
          <Route path="it/dieuhanh" component={ThemDieuHanh} />
          <Route path="it/autofill" component={ThemAutoFill} />
          
          <Route path="dieuhanh" component={HomeDieuHanh} />
          <Route path="dieuhanh/do" component={DieuHanhDO} />
          <Route path="dieuhanh/do/:id" component={DieuHanhEditDO} />
          <Route path="dieuhanh/phuphi" component={DieuHanhPhuPhi} />
          <Route path="dieuhanh/phuphi/:id" component={DieuHanhEditPhuPhi} />
          
          <Route path="thauphu" component={HomeThauPhu} />
          <Route path="thauphu/laixe" component={ThauPhuDanhSachLaiXe} />
          <Route path="thauphu/themlaixe" component={ThauPhuThemLaiXe} />
          
        </Route>
      </Router>
    </Provider>
  </LocaleProvider>
), document.getElementById('root'));
