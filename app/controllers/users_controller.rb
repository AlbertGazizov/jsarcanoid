class UsersController < ApplicationController
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
    debugger
    @user = User.find(params[:id])
    @user.max_points = params[:points]
    respond_to do |format|
      if @user.save
        format.html { redirect_to(@user, :notice => 'User\'s points was successfully updated!') }
      else
        format.html { redirect_to(@user, :notice => 'Eror was occured!') }
      end
    end
  end

end

