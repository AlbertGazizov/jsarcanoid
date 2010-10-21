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
    #@user = User.find(params[:id])
    #@user.max_points = params[:points]
    p "AAAAAAAAAAA"
    p current_user.max_points
    current_user.max_points = params[:points] if params[:points] && (params[:points].to_i > current_user.max_points)
    respond_to do |format|
      if current_user.save
        format.html { redirect_to(current_user, :notice => 'User\'s points was successfully updated!') }
      else
        format.html { redirect_to(current_user, :notice => 'Eror was occured!') }
      end
    end
  end

end

