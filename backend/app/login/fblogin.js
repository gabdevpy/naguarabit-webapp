FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

<!--botón Iniciar Sesión con Facebook, usando el SDK Javascript-->
  <li title="Iniciar Sesión con tu cuentade Facebook">
    <fb:login-button
  scope="public_profile,email"
  onlogin="checkLoginState();">
    </fb:login-button>
   </div>
 </li>

     <!--botón Continuar Como, de Facebook-->
  <li>
    <div class="fb-login-button" data-size="medium" data-button-type="login_with" data-layout="rounded" data-auto-logout-link="false" data-use-continue-as="true" data-width=""></div>
    </a>
  </li>