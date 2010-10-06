class UserSessionsController < ApplicationController
  prepend_before_filter :require_no_authentication, :only => [:create]
  before_filter :require_authentication, :only => [:destroy]
  include Devise::Controllers::InternalHelpers
  def new
  end

  def create
    sign = user_signed_in?
    #resource = warden.authenticate(:scope => :user)

    if sign
      redirect_to users_path
      sign_in(resource)
      notice = "You have been logged in successfully"
      status = 200
    else
      notice = "Authentication failed"
      status = 401
    end

    redirect_to users_path
  end

  def destroy
    sign_out(current_user)
    respond_with(:notice => 'You have been logged out successfully') do |format|
      format.html { redirect_to new_user_session_url }
    end
  end

  protected

  def require_no_authentication
    respond_with(nil, :notice => "You are already logged in", :status => 200) if warden.authenticated?(:user)
  end

end

