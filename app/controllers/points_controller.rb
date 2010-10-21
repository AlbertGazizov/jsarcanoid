class PointsController < ApplicationController
  before_filter require_authentication!
  def edit
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

  def update
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

