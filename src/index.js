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
import PhuCapMenuLaiXe from './components/laixe/PhuCapMenu';
import LaiXeThemDO from './components/laixe/DO';
import LaiXeListDO from './components/laixe/ListDO';
import LaiXeEditDO from './components/laixe/EditDO';

import LaiXeThemPhuPhi from './components/laixe/PhuPhi';
import LaiXeListPhuPhi from './components/laixe/ListPhuPhi';
import LaiXeEditPhuPhi from './components/laixe/EditPhuPhi';

import ThemLaiXe from './components/it/LaiXe';
import ThemThauPhu from './components/it/ThauPhu';
import ThemDieuHanh from './components/it/DieuHanh';
import HomeIT from './components/it/Home';
import ThemAutoFill from './components/it/AutoFill';


import HomeDieuHanh from './components/dieuhanh/Home';
import DieuHanhDO from './components/dieuhanh/ListDO';

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
          <Route path="laixe/phucap" component={PhuCapMenuLaiXe} />

          <Route path="laixe/themdo" component={LaiXeThemDO} />
          <Route path="laixe/danhsachdo" component={LaiXeListDO} />
          <Route path="laixe/do/:id" component={LaiXeEditDO} />


          <Route path="laixe/themphuphi" component={LaiXeThemPhuPhi} />
          <Route path="laixe/danhsachphuphi" component={LaiXeListPhuPhi} />
          <Route path="laixe/phuphi/:id" component={LaiXeEditPhuPhi} />
          
          <Route path="it" component={HomeIT} />
          <Route path="it/thauphu" component={ThemThauPhu} />
          <Route path="it/laixe" component={ThemLaiXe} />
          <Route path="it/dieuhanh" component={ThemDieuHanh} />
          <Route path="it/autofill" component={ThemAutoFill} />
          
          <Route path="dieuhanh" component={HomeDieuHanh} />
          <Route path="dieuhanh/do" component={DieuHanhDO} />
          
          <Route path="thauphu" component={HomeThauPhu} />
          <Route path="thauphu/laixe" component={ThauPhuDanhSachLaiXe} />
          <Route path="thauphu/themlaixe" component={ThauPhuThemLaiXe} />
          
        </Route>
      </Router>
    </Provider>
  </LocaleProvider>
), document.getElementById('root'));
