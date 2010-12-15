class UsersController < ApplicationController
  protect_from_forgery :only => [:index]
  
  def index
    @users = User.all

    respond_to do |format|
      format.html # index.html.erb
      format.json  { render :json => @users }
    end
  end

  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json  { render :json => @user }
    end
  end

  def update_points
    current_user.max_points = params[:points].to_i if params[:points] && (params[:points].to_i > current_user.max_points.to_i)

    respond_to do |format|
      if current_user.save
        format.html { redirect_to(current_user, :notice => 'User\'s points was successfully updated!') }
      else
        format.html { redirect_to(current_user, :notice => 'Eror was occured!') }
      end
    end
  end

end

